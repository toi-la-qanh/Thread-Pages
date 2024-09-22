<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RetweetController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Route for Posts

Route::get('/post', [PostController::class, 'index']);

Route::get('/post/{id}', [PostController::class, 'show']);

Route::patch('/post/{id}', [PostController::class, 'update'])
    ->middleware(['auth'])
    ->name('updatePost');

Route::delete('/post/{id}', [PostController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('deletePost');

Route::post('/post', [PostController::class, 'store'])
    ->middleware(['auth'])
    ->name('storePost');

// Route for Likes

Route::post('/post/{id}/like', [LikeController::class, 'storeLikeOnPost'])
    ->middleware(['auth'])
    ->name('storeLikeOnPost');

Route::delete('/post/{id}/like', [LikeController::class, 'destroyLikeOnPost'])
    ->middleware(['auth'])
    ->name('destroyLikeOnPost');

Route::post(
    '/post/{postID}/comment/{commentID}/like',
    [LikeController::class, 'storeLikeOnComment']
)
    ->middleware(['auth'])
    ->name('storeLikeOnComment');

Route::delete(
    '/post/{postID}/comment/{commentID}/like',
    [LikeController::class, 'destroyLikeOnComment']
)
    ->middleware(['auth'])
    ->name('destroyLikeOnComment');

//Route for Comments

Route::get('/post/{postID}/comment/{commentID}', [CommentController::class, 'show'])
    ->name('showCommentOfComment');

Route::post('/post/{id}/comment', [CommentController::class, 'storeCommentOnPost'])
    ->middleware(['auth'])
    ->name('storeCommentOnPost');

Route::post(
    '/post/{postID}/comment/{commentID}/comment',
    [CommentController::class, 'storeCommentOnComment']
)
    ->middleware(['auth'])
    ->name('storeCommentOnComment');

Route::patch(
    '/post/{postID}/comment/{commentID}',
    [CommentController::class, 'update']
)
    ->middleware(['auth'])
    ->name('updateComment');

Route::delete('/post/{postID}/comment/{commentID}', [CommentController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('deleteComment');

//Route for Retweets

Route::post('/post/{id}/retweet', [RetweetController::class, 'store'])
    ->middleware(['auth'])
    ->name('storeRetweet');

// Route for user

Route::post('/register', [RegisteredUserController::class, 'store'])
    // ->middleware(['guest', 'auth:sanctum'])
    ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    // ->middleware(['throttle:6,1'])
    ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
    // ->middleware(['guest', 'auth:sanctum'])
    ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
    // ->middleware(['guest', 'auth:sanctum'])
    ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
    ->middleware(['auth:sanctum', 'throttle:6,1'])
    ->name('verification.send');

Route::patch('/user/{id}', [UserController::class, 'update'])
    ->middleware(['auth'])
    ->name('user.update');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware(['auth'])
    ->name('logout');

Route::get('/user/{id}', [UserController::class, 'show'])
    ->name('showProfile');

Route::get('/search/{input}', [SearchController::class, 'search'])
    ->name('search');