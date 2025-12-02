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
            $table->text('description')->nullable();
            $table->enum('status', ['approved','on_progress', 'done'])->default('approved');
            $table->decimal('initial_feature_fee', 10, 2);
            $table->decimal('final_feature_fee', 10, 2)->nullable();
            $table->integer('initial_feature_time');
            $table->integer('final_feature_time')->nullable();
            $table->decimal('change_feature_fee', 10, 2)->nullable();
            $table->integer('change_feature_time')->nullable();
            $table->integer('total_cfp')->nullable();
            $table->dateTime('updated at')->nullable();
            $table->integer('total_change_feature_fee')->nullable();
            $table->integer('total_change_feature_time')->nullable();
            $table->timestamps();    });
    }
 
    public function down(): void
    {
        //
    }
};
