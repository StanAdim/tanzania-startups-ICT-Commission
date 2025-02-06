<?php

namespace App\Exports;


use App\Models\Categories\HubProfile;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;


class HubsExport implements  FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function collection()
    {
        return  HubProfile::query()->select(
            'hub_name',
            'total_members',
            'number_female',
            'membership_option',
            'available_programs',
            'brief',
            'partnerships',
            'created_at',
        )->get();
    }
    public function headings(): array
    {
        return [
            "Name",
            "Total Members",
            "Female Members",
            "Membership Options",
            "Available Programs",
            "Description",
            "Partners",
            "Registered on",

        ];
    }
}
