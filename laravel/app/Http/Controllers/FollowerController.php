<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use App\Notifications\Following;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowerController extends Controller
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
     * Display the specified resource.
     */
    public function show(Follower $follower)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follower $follower)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Follower $follower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
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
