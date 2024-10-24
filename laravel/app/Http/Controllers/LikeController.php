<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LikeController extends Controller
{
    /**
     * Show the number of the likes on specified post.
     */
    public function showLikeOnPost(string $id): JsonResponse
    {
        $likes = Like::where('post_id', $id)->count();

        return response()->json($likes);
    }
    /**
     * Show the number of the likes on specified comment.
     */
    public function showLikeOnComment(string $postID, string $commentID): JsonResponse
    {
        $likes = Like::where('comment_id', $commentID)
            ->where('post_id', $postID)
            ->count();

        return response()->json($likes);
    }
    /**
     * Check if user has liked the post.
     */
    public function hasUserLikedPost(Request $request, string $postID): JsonResponse
    {
        $user = $request->user();
        $hasLiked = Like::where('post_id', $postID)
            ->where('user_id', $user->user_id)
            ->exists();

        return response()->json(['has_liked' => $hasLiked]);
    }
    /**
     * Check if user has liked the comment.
     */
    public function hasUserLikedComment(Request $request, string $postID, string $commentID): JsonResponse
    {
        $user = $request->user();
        $hasLiked = Like::where('post_id', $postID)
            ->where('comment_id', $commentID)
            ->where('user_id', $user->user_id)
            ->exists();

        return response()->json(['has_liked' => $hasLiked]);
    }

    /**
     * Store a like on the specified post.
     */
    public function storeLikeOnPost(Request $request, string $id): JsonResponse
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
        $like = Like::create([
            "post_id" => $post->post_id,
            "user_id" => $user->user_id
        ]);
        return response()->json([
            "message" => "Thả cảm xúc vào bài viết thành công !",
            'like' => $like
        ]);

    }
    /**
     * Store a like on the specified comment.
     */
    public function storeLikeOnComment(Request $request, string $postID, string $commentID): JsonResponse
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
        $like = Like::create([
            "comment_id" => $comment->comment_id,
            "user_id" => $user->user_id
        ]);
        return response()->json([
            "message" => "Thả cảm xúc vào bình luận thành công !",
            'like' => $like
        ]);
    }
    /**
     * Remove a like on the specified post.
     */
    public function destroyLikeOnPost(Request $request, string $id): JsonResponse
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

        $like = Like::where('post_id', $post->post_id)
            ->where('user_id', $user->user_id);

        $like->delete();

        return response()->json([
            "message" => "Bạn đã huỷ thích bài viết !",
        ]);
    }
    /**
     * Remove a like on the specified comment.
     */
    public function destroyLikeOnComment(Request $request, string $postID, string $commentID): JsonResponse
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
        $like = Like::where("comment_id", $comment->comment_id)
            ->where("user_id", $user->user_id)
            ->first();
        $like->delete();
        return response()->json(["message" => "Bạn đã huỷ thích bình luận !"]);
    }
}
