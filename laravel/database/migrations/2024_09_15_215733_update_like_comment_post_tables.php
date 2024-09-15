<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('retweet_id')->nullable();
            $table->foreign('retweet_id')
                ->references('retweet_id')
                ->on('retweets')
                ->onDelete('cascade');
        });
        Schema::table('likes', function (Blueprint $table) {
            $table->unsignedBigInteger('comment_id')->nullable();
            $table->foreign('comment_id')
                ->references('comment_id')
                ->on('comments')
                ->onDelete('cascade');
        });
        Schema::table('comments', function (Blueprint $table) {
            $table->unsignedBigInteger('like_id')->nullable();
            $table->foreign('like_id')
                ->references('like_id')
                ->on('likes')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('retweet_id');
        });
        Schema::table('likes', function (Blueprint $table) {
            $table->dropColumn('comment_id');
        });
        Schema::table('comments', function (Blueprint $table) {
            $table->dropColumn('like_id');
        });
    }
};
