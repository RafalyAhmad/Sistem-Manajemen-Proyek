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
        Schema::create('feature_project', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->foreignId('feature_id');
            $table->enum('status', ['to_do', 'in_progress', 'done'])->default('to_do');
            $table->enum('added_type', ['baseline', 'change']);
            $table->integer('fp_adjustment');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
