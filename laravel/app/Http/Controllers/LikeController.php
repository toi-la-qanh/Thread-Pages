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
     * Store a newly created resource in storage.
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
     * Remove the specified resource from storage.
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
