<?php

namespace App\Http\Resources;

use App\Models\Region;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApprovedHubResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'type' => 'Innovation Hub',
            'name' => $this->hub_name,
            // Profileable data
            'location' => Region::where('id', $this->profile->region)->first()->region,
        ];
    }
}
