<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('programme_applications', function (Blueprint $table) {
            $table->id();
            $table->string('profile_id');
            $table->string('programme_id');
            $table->string('status')->default('pending'); // "pending", "approved", "rejected"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programme_applications');
    }
};
