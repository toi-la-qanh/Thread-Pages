<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function storeCommentOnPost(Request $request, string $id): JsonResponse
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $user = $request->user();
        if (!$user) {
            return response()->json(["message" => "Không tìm thấy người dùng"], 401);
        }

        $validatedData = $request->validate([
            'content' => ['required', 'min:5', 'max:100']
        ], [
            'content.required' => 'Nội dung không được để trống !',
            'content.min' => 'Bình luận chứa tối thiểu 5 ký tự',
            'content.max' => 'Bình luận chứa tối đa 100 ký tự'
        ]);

        $comment = Comment::create([
            'user_id' => $user->user_id,
            'post_id' => $post->post_id,
            'content' => $validatedData['content'],
        ]);

        return response()->json([
            'message' => 'Tạo bình luận thành công !',
            'comment' => $comment
        ]);
    }
    public function storeCommentOnComment(Request $request, string $postID, string $commentID): JsonResponse
    {
        $post = Post::find($postID);
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $comment = Comment::find($commentID);
        if (!$comment) {
            return response()->json([
                'message' => 'Bình luận không tồn tại !'
            ], 404);
        }

        $user = $request->user();
        if (!$user) {
            return response()->json(["message" => "Không tìm thấy người dùng"], 401);
        }

        $validatedData = $request->validate([
            'content' => ['required', 'min:5', 'max:100']
        ], [
            'content.required' => 'Nội dung không được để trống !',
            'content.min' => 'Bình luận chứa tối thiểu 5 ký tự !',
            'content.max' => 'Bình luận chứa tối đa 100 ký tự !'
        ]);

        $newComment = Comment::create([
            'user_id' => $user->user_id,
            'post_id' => $post->post_id,
            'parent_id' => $comment->comment_id,
            'content' => $validatedData['content'],
        ]);

        return response()->json([
            'message' => 'Tạo bình luận con thành công !',
            'comment' => $newComment
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $postID, string $commentID): JsonResponse
    {
        $post = Post::find($postID);
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $comment = Comment::find($commentID);
        if (!$comment) {
            return response()->json([
                'message' => 'Bình luận không tồn tại !'
            ], 404);
        }

        $showComment = Comment::where('post_id', $post->post_id)
            ->where('comment_id', $comment->comment_id)
            ->with('users')
            ->withCount('likes')
            ->withCount('children')
            ->with([
                'children' => function ($query) {
                    $query->with('users')
                        ->withCount('children')
                        ->withCount('likes');
                }
            ])
            ->first();
        return response()->json($showComment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $postID, string $commentID): JsonResponse
    {
        $post = Post::find($postID);
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $comment = Comment::find($commentID);
        if (!$comment) {
            return response()->json([
                'message' => 'Bình luận không tồn tại !'
            ], 404);
        }

        $user = $request->user();
        if ($user->user_id !== $comment->user_id) {
            return response()->json([
                'message' => 'Bạn không có quyền chỉnh sửa bình luận này vì bình luận này không phải của bạn !'
            ], 403);
        }

        $validatedData = $request->validate([
            'content' => ['nullable', 'min:5', 'max:100']
        ], [
            'content.min' => 'Bình luận chứa tối thiểu 5 ký tự !',
            'content.max' => 'Bình luận chứa tối đa 100 ký tự !'
        ]);

        $updateComment = Comment::where('user_id', $user->user_id)
            ->where('post_id', $post->post_id)
            ->where('comment_id', $commentID)
            ->first();

        $updateComment->update([
            'content' => $validatedData['content']
        ]);

        return response()->json([
            'message' => 'Chỉnh sửa bình luận thành công !',
            'comment' => $updateComment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $postID, string $commentID): JsonResponse
    {
        $post = Post::find($postID);
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $comment = Comment::find($commentID);
        if (!$comment) {
            return response()->json([
                'message' => 'Bình luận không tồn tại !'
            ], 404);
        }

        $user = $request->user();
        if ($user->user_id !== $comment->user_id) {
            return response()->json([
                'message' => 'Bạn không có quyền xoá bình luận này vì bình luận này không phải của bạn !'
            ], 403);
        }

        $deleteComment = Comment::where('user_id', $user->user_id)
            ->where('post_id', $post->post_id)
            ->where('comment_id', $commentID)
            ->first();

        $deleteComment->delete();

        return response()->json([
            'message' => 'Xoá bình luận thành công !',
        ]);
    }
}
