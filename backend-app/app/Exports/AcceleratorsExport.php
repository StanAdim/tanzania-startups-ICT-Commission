<?php

namespace App\Exports;


use App\Models\Categories\AcceleratorProfile;
use App\Models\Categories\StartupProfile;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;


class AcceleratorsExport implements  FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function collection()
    {
        return  AcceleratorProfile::query()->select(
            'accelerator_name',
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
            "Description",
            "Registered on",
        ];
    }
}
