<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function storeLikeOnPost(Request $request): JsonResponse
    {
        $request->validate([
            'post_id' => ['required', 'exists:posts,post_id'],
        ], [
            'post_id.required' => 'Phải có bài viết mới thả cảm xúc được !',
            'post_id.exists' => 'Bài viết không tồn tại !',
        ]);
        $user = $request->user();
        if(!$user){
            return response()->json(["message" => "Không tìm thấy người dùng"], 401);
        }
        $like = Like::where("post_id", $request->post_id)
            ->where("user_id", $user->user_id)
            ->first();
        if ($like) {
            $like->delete();
            return response()->json(["message" => "Bạn đã huỷ thích bài viết !"]);
        } else {
            $like->create([
                "post_id" => $request->post_id,
                "user_id" => $user->user_id
            ]);
            return response()->json([
                "message" => "Thả cảm xúc vào bài viết thành công !",
                'like' => $like
            ]);
        }
    }
    public function storeLikeOnComment(Request $request): JsonResponse
    {
        $request->validate([
            'comment_id' => ['required', 'exists:comments,comment_id'],
        ], [
            'comment_id.required' => 'Phải có bình luận mới thả cảm xúc được !',
            'comment_id.exists' => 'Bình luận không tồn tại !',
        ]);
        $user = $request->user();
        if(!$user){
            return response()->json(["message" => "Không tìm thấy người dùng"], 401);
        }
        $like = Like::where("comment_id", $request->comment_id)
            ->where("user_id", $user->user_id)
            ->first();
        if ($like) {
            $like->delete();
            return response()->json(["message" => "Bạn đã huỷ thích bài viết !"]);
        } else {
            $like->create([
                "comment_id" => $request->comment_id,
                "user_id" => $user->user_id
            ]);
            return response()->json([
                "message" => "Thả cảm xúc vào bình luận thành công !",
                'like' => $like
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Like $like)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Like $like)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Like $like)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Like $like)
    {
        //
    }
}
