<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Retweet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class RetweetController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id): JsonResponse
    {
        $post = Post::where('post_id', $id)->first();
        if (!$post) {
            return response()->json([
                'message' => 'Bài viết không tồn tại !'
            ], 404);
        }

        $user = $request->user();
        if (!$user) {
            return response()->json(["message" => "Không tìm thấy người dùng"], 401);
        }

        $retweet = Retweet::where('post_id', $post->post_id)
            ->where('user_id', $user->user_id)
            ->first();

        if ($retweet) {
            $retweet->delete();
        }

        $newRetweet = Retweet::create(
            [
                'user_id' => $user->user_id,
                'post_id' => $post->post_id
            ]
        );

        return response()->json([
            'message' => 'Đăng lại bài viết thành công !',
            'retweet' => $newRetweet
        ]);

    }
}
