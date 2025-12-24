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
        Schema::create('meetings', function (Blueprint $table) {
            $table->id('meeting_id'); // PK
            $table->foreignId('user_id');
            $table->foreignId('project_id');
            $table->text('title');
            $table->text('description');
            $table->text('notulensi');
            $table->datetime('meeting_time');
            $table->string('email_to');
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
