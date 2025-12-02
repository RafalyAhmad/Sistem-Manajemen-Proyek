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
            $table->decimal('initial_project_fee', 10, 2);
            $table->decimal('final_project_fee', 10, 2)->nullable();
            $table->dateTime('initial_project_time');
            $table->dateTime('final_project_time')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['in_progress', 'complete'])->default('in_progress');
            $table->integer('total_cfp')->nullable();
            $table->integer('total_rcaf')->nullable();
            $table->decimal('total_feature_fee', 10, 2)->nullable();
            $table->integer('total_feature_time')->nullable();
            $table->timestamps();
        });
    }
};
