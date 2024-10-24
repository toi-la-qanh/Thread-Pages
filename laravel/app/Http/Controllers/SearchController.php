<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    /**
     * Search posts.
     */
    public function searchPosts(string $input): JsonResponse
    {
        // Search posts
        $posts = Post::where('title', 'like', "%{$input}%")
            ->orWhere('content', 'like', "%{$input}%")
            ->with([
                'users' => function ($query) {
                    $query->select('user_id', 'display_name', 'profile_image');
                }
            ])
            ->get();

        return response()->json([
            'posts' => $posts,
        ]);
    }
    /**
     * Search users.
     */
    public function searchUsers(string $input): JsonResponse
    {
        // Search users
        $users = User::where('display_name', 'like', "%{$input}%")
            ->orWhere('username', 'like', "%{$input}%")
            ->orWhere('email', 'like', "%{$input}%")
            ->get();

        return response()->json([
            'users' => $users,
        ]);
    }
    /**
     * Search comments.
     */
    public function searchComments(string $input): JsonResponse
    {
        // Search comments
        $comments = Comment::where('content', 'like', "%{$input}%")
            ->with([
                'users' => function ($query) {
                    $query->select('user_id', 'display_name', 'profile_image');
                }
            ])
            ->get();

        return response()->json([
            'comments' => $comments,
        ]);
    }
}
