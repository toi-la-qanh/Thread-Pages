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
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('like_id');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('follower_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->unsignedBigInteger('like_id')->nullable();
        });
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('follower_id')->nullable();
        });
    }
};
