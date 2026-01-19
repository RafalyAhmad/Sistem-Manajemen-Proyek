<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('features', function (Blueprint $table) {
            $table->id('feature_id');
            $table->string('feature_name');
            $table->text('description');
            $table->integer('external_input');
            $table->integer('external_output');
            $table->integer('logical_internal_file');
            $table->integer('external_interface_file');
            $table->integer('external_inquiry');
            $table->integer('feature_cfp');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        //
    }
};
