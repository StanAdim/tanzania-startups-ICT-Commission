<?php

namespace App\Exports;


use App\Models\Categories\GrassrootProgramProfile;
use App\Models\Categories\StartupProfile;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;


class GrassrootProgrammesExport implements  FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function collection()
    {
        return  GrassrootProgramProfile::query()->select(
            'grassroot_name',
            'focus_area',
            'brief_description',
            'created_at',
        )->get();
    }
    public function headings(): array
    {
        return [
            "Name",
            "Focus Area",
            "Brief",
            "Registered On",
        ];
    }
}
