<?php

namespace App\Exports;


use App\Models\Categories\StartupProfile;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;


class StartupsExport implements  FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return  StartupProfile::query()->select(
            'startup_name',
            'industry',
            'funding_stage',
            'team_size',
            'website',
            'description',
            'founders',
            'created_at'
        )->get();
    }
    public function headings(): array
    {
        return [
            "Name",
            "Industry",
            "Funding Stage",
            "Team size",
            "Website",
            "Description",
            "Founders",
            'Registered On'
        ];
    }
}
