<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('features', function (Blueprint $table) {
            $table->id('feature_id'); // PK
            $table->foreignId('project_id');
            $table->string('feature_name');
            $table->text('description');
            $table->enum('status', ['approved', 'in_progress', 'done'])->default('approved');
            $table->integer('external_input');
            $table->integer('external_output');
            $table->integer('logical_internal_file');
            $table->integer('external_interface_file');
            $table->integer('external_inquiry');
            $table->integer('feature_cfp');
            $table->decimal('initial_feature_fee', 10, 2)->nullable();
            $table->decimal('final_feature_fee', 10, 2)->nullable();
            $table->integer('initial_feature_time')->nullable();
            $table->integer('final_feature_time')->nullable();
            $table->decimal('change_feature_fee', 10, 2)->nullable();
            $table->integer('change_feature_time')->nullable();
            $table->integer('total_change_feature_fee')->nullable();
            $table->integer('total_change_feature_time')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        //
    }
};
