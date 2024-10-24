<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Notifications\Following;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    /**
     * Follow the specified user.
     */
    public function store(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'Bạn chưa đăng nhập !'
            ], 401);
        }

        $personNeedToFollow = Follower::find($id);
        if (!$personNeedToFollow) {
            return response()->json([
                'Không tìm thấy người dùng này !'
            ], 404);
        }

        $follow = Follower::create([
            'user_id' => $user->user_id,
        ]);
        // Notify all followers
        foreach ($user->followers as $follower) {
            $follower->notify(new Following($follower, $user));
        }
        return response()->json([
            'message' => 'Đã theo dõi người dùng này !',
            'follow' => $follow,
        ]);
    }

    /**
     * Show the number of followers which belong to the specified user.
     */
    public function show(string $id)
    {
        $followers = Follower::where('user_id', $id)->count();

        return response()->json($followers);
    }

    /**
     * Unfollow the specified user.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'Bạn chưa đăng nhập !'
            ], 401);
        }

        $personNeedToUnfollow = Follower::find($id);
        if (!$personNeedToUnfollow) {
            return response()->json([
                'Không tìm thấy người dùng này !'
            ], 404);
        }

        $follow = Follower::where('user_id', $user->user_id)
            ->where('follower_id', $personNeedToUnfollow->user_id)
            ->first();

        $follow->delete();

        return response()->json([
            'message' => 'Huỷ theo dõi người dùng thành công !',
        ]);
    }
}
