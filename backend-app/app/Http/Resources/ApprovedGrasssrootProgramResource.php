<?php

namespace App\Http\Resources;

use App\Models\ICTSector;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovedGrasssrootProgramResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'name' => $this->grassroot_name,
            'industry' => $this->getFocusAreaNames()[0],
            // Profileable data
            'location' => Region::where('id', $this->profile->region)->first()->region,
        ];
    }
    protected function getFocusAreaNames(): array {
        $focusAreaIds = is_array($this->focus_area) ? $this->focus_area : json_decode($this->focus_area, true);
        return ICTSector::whereIn('id', $focusAreaIds)->pluck('name')->toArray();
    }
}
