<?php

namespace App\Http\Resources;

use App\Models\FundingStage;
use App\Models\ICTSector;
use App\Models\Region;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovedProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
                'industry' => ICTSector::where('id',$this->industry)->first()->name,
                'name' => $this->startup_name,
                // Profileable data
                'location' => Region::where('id', $this->profile->region)->first()->region,
            ];
    }
}
