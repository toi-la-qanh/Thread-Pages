<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CommentController extends Controller
{
    /**
     * Show the number of comments on the specified post.
     */
    public function countCommentOnPost(string $id): JsonResponse
    {
        $comments = Comment::where('post_id', $id)->count();

        return response()->json($comments);
    }
    /**
     * Show the number of reply comments on the specified comment.
     */
    public function countCommentOnComment(string $postID, string $commentID): JsonResponse
    {
        $comments = Comment::where('parent_id', $commentID)
            ->where('post_id', $postID)
            ->count();

        return response()->json($comments);
    }
    /**
     * Store a new comment on the specified post.
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
        /**
     * Store a new reply comment on the specified comment.
     */
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
     * Display the specified comment content.
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
            ->with([
                'users' => function ($query) {
                    $query->select('user_id', 'display_name', 'profile_image');
                }
            ])
            ->first();
        return response()->json($showComment);
    }

    /**
     * Update the specified comment.
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
     * Remove the specified comment.
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
