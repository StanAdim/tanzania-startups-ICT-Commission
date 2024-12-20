<?php

namespace App\Http\Resources;

use App\Models\ICTSector;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uid' => $this->uid,
            'title' => $this->title,
            'category' => ICTSector::where('id',$this->category)->first()->name,
            'year' => $this->year,
            'brief' => $this->brief,
            'status' => $this->status,
            'registrationDate'=> Carbon::parse($this->created_at)->format('j M, Y, H:i'),

        ];
    }
}
