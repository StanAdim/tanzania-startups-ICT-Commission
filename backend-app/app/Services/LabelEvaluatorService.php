<?php

namespace App\Services;

use App\Models\Categories\StartupProfile;

class LabelEvaluatorService
{
    /**
     * Evaluate and return the growth stage label for a startup.
     */
    public function evaluate(StartupProfile $startup): string
    {
        // Example rules (replace with config-driven logic for extensibility)
        if ($startup->team_size < 3 && $startup->funding_stage === 'Ideation Stage') {
            return 'Idea Stage';
        }
        if ($startup->team_size >= 3 && $startup->funding_stage === 'Prototype Stage') {
            return 'Early Stage';
        }
        if ($startup->team_size >= 5 && $startup->funding_stage === 'Acceleration Stage') {
            return 'Growth Stage';
        }
        if ($startup->team_size >= 10 && $startup->funding_stage === 'Commercial Stage') {
            return 'Mature Stage';
        }
        // Default fallback
        return 'Unlabeled';
    }
} 