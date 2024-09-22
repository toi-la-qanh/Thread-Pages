<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Notifications\PostCreated;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $posts = Post::with('users')

            ->withCount("likes")

            ->withCount("comments")

            ->withCount("retweets")

            ->get();

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => ['required', 'min:10', 'max:150'],
            'content' => ['required', 'min:50', 'max:1000'],
        ], [
            'title.required' => 'Tiêu đề không được để trống !',
            'title.min' => 'Tiêu đề chứa không dưới 10 ký tự !',
            'title.max' => 'Tiêu đề chỉ chứa tối đa 150 ký tự !',

            'content.required' => 'Nội dung không được để trống !',
            'content.min' => 'Nội dung chứa không được dưới 50 ký tự !',
            'content.max' => 'Nội dung chỉ chứa tối đa dưới 1000 ký tự !',
        ]);

        // If there's an image, store it and get the path
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('post_images', 'public'); // Store in 'storage/app/public/post_images'
        }

        $user = $request->user();
        // Create a new post and associate it with the authenticated user
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->input("content"),
            'image' => $imagePath,
            'user_id' => $user->user_id, // Assuming you're using user authentication
        ]);

        // Notify all followers
        foreach ($user->followers as $follower) {
            $follower->notify(new PostCreated($post, $user));
        }

        return response()->json([
            'message' => 'Tạo bài viết thành công !',
            'post' => $post
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $post = Post::where('post_id', $id)
            ->with('users')
            ->withCount('likes')
            ->withCount('comments')
            ->withCount('retweets')
            ->with([
                'comments' => function ($query) {
                    $query->whereNull('parent_id')
                        ->with('users')
                        ->withCount('children')
                        ->withCount('likes')
                        ->with([
                            'children' => function ($query) {
                                $query->take(2)
                                    ->with('users')
                                    ->withCount('children')
                                    ->withCount('likes');
                            }
                        ]);
                }
            ])
            ->first();

        if (!$post) {
            return response()->json([
                'message' => 'Không tìm thấy bài viết !'
            ], 404);
        }

        DB::table('posts')
            ->where('post_id', $id)
            ->increment('clicks', 1);

        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $user = $request->user();
        if ($post->user_id !== $user->user_id) {
            return response()->json([
                'message' => 'Bạn không có quyền chỉnh sửa bài viết này vì bài viết này không thuộc về bạn!'
            ], 403);
        }

        $request->validate([
            'title' => ['nullable', 'min:20', 'max:150'],
            'content' => ['nullable', 'min:50', 'max:1000'],
        ], [
            'title.min' => 'Tiêu đề chứa không dưới 20 ký tự !',
            'title.max' => 'Tiêu đề chỉ chứa tối đa 150 ký tự !',

            'content.min' => 'Nội dung chứa không được dưới 50 ký tự !',
            'content.max' => 'Nội dung chỉ chứa tối đa dưới 1000 ký tự !',
        ]);
        // If there's an image, store it and get the path
        $imagePath = $post->image; // Default to the current image if no new image is uploaded
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($imagePath && file_exists(storage_path('app/public/' . $imagePath))) {
                unlink(storage_path('app/public/' . $imagePath));
            }

            // Store the new image
            $imagePath = $request->file('image')->store('post_images', 'public');
        }

        $updatePost = Post::where('post_id', $id)
            ->where('user_id', $user->user_id)
            ->first();

        $updatePost->update([
            'title' => $request->input('title', $post->title),
            'content' => $request->input('content', $post->content),
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Bài viết ' . $updatePost->title . ' đã được cập nhật !',
            'post' => $updatePost
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        // Retrieve the post to delete
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Không tìm thấy bài viết để xoá !'
            ], 404);
        }
        // Check if the post belongs to the authenticated user
        if ($post->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Bạn không có quyền xoá bài viết này vì bài viết này không thuộc về bạn!'
            ], 403);
        }
        // Delete the post
        $post->delete();
        // Optionally, delete the associated image if it exists
        if ($post->image && file_exists(storage_path('app/public/' . $post->image))) {
            unlink(storage_path('app/public/' . $post->image));
        }
        return response()->json([
            'message' => 'Xoá bài viết thành công ! '
        ], 200);
    }
}
