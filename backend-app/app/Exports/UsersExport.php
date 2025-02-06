<?php

namespace App\Exports;


use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;


class UsersExport implements  FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return User::select(
            'first_name',
            'middle_name',
            'last_name',
            'phone_number',
            'email',
            'rank',
            'created_at')
            ->get();
    }
    public function headings(): array
    {
        return [
            "First Name",
            "Middle Name",
            "Last Name",
            "Phone Number",
            "Email",
            "Rank",
            "Registered On",
        ];
    }
}
