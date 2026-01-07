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
        Schema::create('projects', function (Blueprint $table) {
            $table->id('project_id'); // PK
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // FK to 'users' table (as an example)
            $table->string('project_name', 255);
            $table->integer('initial_project_fee');
            $table->integer('final_project_fee');
            $table->integer('initial_project_time');
            $table->integer('final_project_time');
            $table->text('description');
            $table->enum('status', ['in_progress', 'complete'])->default('in_progress');
            $table->integer('total_cfp');
            $table->integer('total_rcaf');
            $table->integer('total_feature_fee');
            $table->integer('total_feature_time');
            $table->timestamps();
        });
    }
};
