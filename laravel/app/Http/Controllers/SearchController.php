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
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function search(string $input): JsonResponse
    {
        // Search posts
        $posts = Post::where('title', 'like', "%{$input}%")
            ->orWhere('content', 'like', "%{$input}%")
            ->with('users')
            ->withCount(['comments', 'likes', 'retweets'])
            ->get();

        // Search users
        $users = User::where('display_name', 'like', "%{$input}%")
            ->orWhere('username', 'like', "%{$input}%")
            ->orWhere('email', 'like', "%{$input}%")
            ->get();

        // Search comments
        $comments = Comment::where('content', 'like', "%{$input}%")
            ->with('users')
            ->withCount(['children', 'likes'])
            ->get();

        return response()->json([
            'posts' => $posts,
            'users' => $users,
            'comments' => $comments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
