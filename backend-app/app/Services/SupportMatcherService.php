<?php

namespace App\Services;

use App\Models\Categories\StartupProfile;
use App\Models\Categories\HubProfile;
use App\Models\Categories\AcceleratorProfile;
use App\Models\Categories\GrassrootProgramProfile;

class SupportMatcherService
{
    public function recommendForStartup(StartupProfile $startup)
    {
        // Example: Find hubs/programs/accelerators in same region and sector
        $region = $startup->profile->region ?? null;
        $industry = $startup->industry;
        return [
            'hubs' => HubProfile::whereHas('profile', function($q) use ($region) {
                $q->where('region', $region);
            })->where('industry', $industry)->get(),
            'accelerators' => AcceleratorProfile::whereHas('profile', function($q) use ($region) {
                $q->where('region', $region);
            })->where('focus_area', $industry)->get(),
            'programs' => GrassrootProgramProfile::whereHas('profile', function($q) use ($region) {
                $q->where('region', $region);
            })->where('focus_area', $industry)->get(),
        ];
    }
} 