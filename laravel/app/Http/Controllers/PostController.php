<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['user', 'comments.user'])->get();

        return response()->json([
            'title' => $posts->title,
            'content' => $posts->content,
            'post_image' => $posts->image,
            'created_at' => $posts->created_at,
            'updated_at' => $posts->updated_at,
            'user' => [
                'display_name' => $posts->user->display_name,
                'profile_image' => $posts->user->profile_image,
            ],
            'comments' => [
                'content' => $posts->comment->content,
                'created_at' => $posts->comment->created_at,
                'updated_at' => $posts->comment->updated_at,
                'user' => [
                    'display_name' => $posts->comment->user->display_name,
                    'profile_image' => $posts->comment->user->profile_image,
                ]
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => ['required', 'min:30', 'max:150'],
            'content' => ['required', 'min:100', 'max:1000'],
        ], [
            'title.required' => 'Tiêu đề không được để trống !',
            'title.min' => 'Tiêu đề chứa không dưới 30 ký tự !',
            'title.max' => 'Tiêu đề chỉ chứa tối đa 150 ký tự !',

            'content.required' => 'Nội dung không được để trống !',
            'content.min' => 'Nội dung chứa không được dưới 100 ký tự !',
            'content.max' => 'Nội dung chỉ chứa tối đa dưới 1000 ký tự !',
        ]);

        // If there's an image, store it and get the path
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('post_images', 'public'); // Store in 'storage/app/public/post_images'
        }

        // Create a new post and associate it with the authenticated user
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath,
            'user_id' => auth()->id(), // Assuming you're using user authentication
        ]);

        return response()->json([
            'message' => 'Tạo bài viết thành công !',
            'post' => $post
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::where('post_id', $id);
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
