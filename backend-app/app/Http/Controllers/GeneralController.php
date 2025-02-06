<?php

namespace App\Http\Controllers;

use App\Http\Resources\AcceleratorResource;
use App\Http\Resources\ApprovedAcceleratorResource;
use App\Http\Resources\ApprovedGrasssrootProgramResource;
use App\Http\Resources\ApprovedHubResource;
use App\Http\Resources\ApprovedProfileResource;
use App\Http\Resources\GrassrootProgramResource;
use App\Http\Resources\HubResource;
use App\Http\Resources\ICTProductResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\StartupResource;
use App\Models\Categories\AcceleratorProfile;
use App\Models\Categories\GrassrootProgramProfile;
use App\Models\Categories\HubProfile;
use App\Models\Categories\StartupProfile;
use App\Models\DocumentType;
use App\Models\FundingStage;
use App\Models\IctProduct;
use App\Models\ICTSector;
use App\Models\Project;
use App\Models\Region;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GeneralController extends Controller
{
    // Global types
    protected $typeModels = [
        'startups' => [
            'model' => StartupProfile::class,
            'resource' => ApprovedProfileResource::class,
            'searchFields' => ['startup_name', 'industry', 'website', 'description']
        ],
        'hubs' => [
            'model' => HubProfile::class,
            'resource' => ApprovedHubResource::class,
            'searchFields' => ['hub_name', 'available_programs', 'brief'] // Add actual searchable fields
        ],
        'accelerators' => [
            'model' => AcceleratorProfile::class,
            'resource' => ApprovedAcceleratorResource::class,
            'searchFields' => ['accelerator_name', 'brief_description'] // Add actual searchable fields
        ],
        'grassroots' => [
            'model' => GrassrootProgramProfile::class,
            'resource' => ApprovedGrasssrootProgramResource::class,
            'searchFields' => ['grassroot_name', 'brief_description', 'focus_area'] // Add actual searchable fields
        ],
    ];

    /**
     * Get profile configuration for a specific type
     */
    protected function getProfileConfig($type)
    {
        return $this->typeModels[$type] ?? null;
    }

    public function profileCount($type): JsonResponse
    {
        $Items = match ($type) {
            'startups' => StartupProfile::all()->count(),
            "hubs" => HubProfile::all()->count(),
            "accelerators" => AcceleratorProfile::all()->count(),
            "grassroots" => GrassrootProgramProfile::all()->count(),
            default => 0,
        };
        return response()->json([
            'message' => 'Success!, ' . $type . ' count',
            'count' => $Items
        ], 200);
    }

    public function approvedProfiles($type, Request $request)
    {
        $profileConfig = $this->getProfileConfig($type);
        if (!$profileConfig) {
            return response()->json([
                'message' => 'Invalid profile type',
                'data' => []
            ], 400);
        }

        // Extract configuration
        $modelClass = $profileConfig['model'];
        $resourceClass = $profileConfig['resource'];
        $searchFields = $profileConfig['searchFields'];

        // Retrieve query parameters
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        // Build query
        $query = $modelClass::query()->where('status', true)->orderBy('id', 'desc');

        // Apply search if search term exists
        if ($search) {
            $query->where(function ($q) use ($search, $searchFields) {
                foreach ($searchFields as $field) {
                    $q->orWhereRaw("LOWER($field) LIKE ?", ["%" . strtolower($search) . "%"]);
                }
            });
        }
        // Paginate results
        $items = $query->paginate($perPage);
        // Transform results
        $data = $resourceClass::collection($items);
        // Return paginated response
        return response()->json([
            'message' => "Success! All {$type}",
            'data' => $data,
            'pagination' => [
                'current_page' => $items->currentPage(),
                'last_page' => $items->lastPage(),
                'per_page' => $items->perPage(),
                'total' => $items->total(),
                'next_page_url' => $items->nextPageUrl(),
                'prev_page_url' => $items->previousPageUrl(),
            ],
        ], 200);
    }

    public function sectors(): JsonResponse
    {
        $items = ICTSector::orderBy('name', 'asc')->get()->map(function ($sector) {
            return [
                'value' => $sector->id,
                'label' => $sector->name,
            ];
        });
        return response()->json([
            'message' => 'Sectors',
            'data' => $items
        ], 200);
    }

    public function document_types(): JsonResponse
    {
        $items = DocumentType::all()->map(function ($type) {
            return [
                'value' => $type->id,
                'label' => $type->name,
            ];
        });
        return response()->json([
            'message' => 'types',
            'data' => $items
        ], 200);
    }

    public function fundingStages(): JsonResponse
    {
        $items = FundingStage::orderBy('name', 'asc')->get()->map(function ($sector) {
            return [
                'value' => $sector->id,
                'label' => $sector->name,
                'description' => $sector->description,
            ];
        });
        return response()->json([
            'message' => 'Funding stages',
            'data' => $items
        ], 200);
    }

    public function getRegions(): JsonResponse
    {
        $items = Region::all()->map(function ($sector) {
            return [
                'value' => $sector->id,
                'label' => $sector->region,
            ];
        });
        return response()->json([
            'message' => 'Regions',
            'data' => $items
        ], 200);
    }
}
