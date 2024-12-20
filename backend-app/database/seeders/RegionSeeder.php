<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $json = file_get_contents(database_path('data/Regions.json'));
        $data = json_decode($json, true);
        foreach ($data as $region) {
            DB::table('regions')->insert([
                'region' => $region['region'],
            ]);
        }
    }
}
