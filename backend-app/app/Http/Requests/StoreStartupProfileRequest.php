<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStartupProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    public function rules()
    {
        return [
            'startup_name' => 'required|string|max:255|unique:startup_profiles',
            'industry' => 'required|string|max:255',
            'funding_stage' => 'required|string|max:255',
            'team_size' => 'required|integer|min:1',
            'founders' => 'nullable|array',
            'website' => 'nullable|string',
            'description' => 'nullable|string',
            // Add other rules as needed
        ];
    }
} 