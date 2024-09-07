<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    Route::resource('posts', PostController::class);
});

require __DIR__.'/auth.php';
