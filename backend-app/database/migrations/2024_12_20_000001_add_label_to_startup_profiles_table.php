<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('startup_profiles', function (Blueprint $table) {
            $table->string('label')->nullable();
        });
        Schema::create('label_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('startup_profile_id')->constrained();
            $table->string('label');
            $table->json('criteria_snapshot');
            $table->timestamp('assigned_at');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::table('startup_profiles', function (Blueprint $table) {
            $table->dropColumn('label');
        });
        Schema::dropIfExists('label_histories');
    }
}; 