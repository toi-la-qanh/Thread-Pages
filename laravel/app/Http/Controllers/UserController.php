<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $checkIfUserExists = User::find($id);
        if (!$checkIfUserExists) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng này !'
            ], 404);
        }

        $profile = User::with([
            'posts' => function ($query) {
                $query
                    ->withCount(['likes', 'comments', 'retweets'])
                    ->with('users');
            },
            'likes.posts' => function ($query) {
                $query
                    ->withCount(['likes', 'comments', 'retweets'])
                    ->with('users');
            },
            'comments' => function ($query) {
                $query
                    ->withCount(['likes', 'children'])
                    ->with('users');
            },
            'retweets.posts' => function ($query) {
                $query
                    ->withCount(['likes', 'comments', 'retweets'])
                    ->with('users');
            },
            'followers.users',
        ])
            ->withCount('followers')
            ->where('user_id', $id)
            ->first();
        return response()->json($profile);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng !'
            ], 404);
        }

        if ($user->user_id !== auth()->id()) {
            return response()->json([
                'message' => 'Bạn không có quyền chỉnh sửa tài khoản này vì tài khoản này không thuộc về bạn!'
            ], 403);
        }

        // Validate the request
        $request->validate([
            'display_name' => ['nullable', 'string', 'regex:/^[\p{L}\sà-ỹÀ-Ỵ]+$/u', 'min:6', 'max:30'],
            'profile_image' => ['nullable', 'mimes:jpeg,png,jpg'],
        ], [
            'display_name.regex' => 'Tên hiển thị chỉ bao gồm chữ !',
            'display_name.min' => 'Tên hiển thị tối thiểu 6 ký tự !',
            'display_name.max' => 'Tên hiển thị tối đa 30 ký tự !',

            'profile_image.mimes' => 'Định dạng không phù hợp !',
        ]);

        // Default to the current image if no new image is uploaded
        $imagePath = $user->profile_image;

        if ($request->hasFile('profile_image')) {
            // Delete the old image if it exists
            if ($imagePath && file_exists(storage_path('app/public/' . $imagePath))) {
                unlink(storage_path('app/public/' . $imagePath));
            }
            // Store the new image
            $imagePath = $request->file('profile_image')->store('user_images', 'public');
        } else {
            return response()->json([
                'message' => 'No file received !'
            ]);
        }
        // Update the user's information
        $user->update([
            'display_name' => $request->input('display_name', $user->display_name),
            'profile_image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Tài khoản của người dùng ' . $user->display_name . ' đã được cập nhật !',
            'user' => $user,
            'image' => $imagePath
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
