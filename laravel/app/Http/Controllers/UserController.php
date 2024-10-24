<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Display the profile of a user.
     */
    public function showProfile(string $id): JsonResponse
    {
        $checkIfUserExists = User::find($id);
        if (!$checkIfUserExists) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng này !'
            ], 404);
        }

        $user = User::where('user_id', $id)->first();

        return response()->json($user);
    }

    /**
     * Display the post which is owned by a user.
     */
    public function showPostOwnedByUser(string $id): JsonResponse
    {
        $checkIfUserExists = User::find($id);
        if (!$checkIfUserExists) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng này !'
            ], 404);
        }

        $post = Post::where('user_id', $id)->first();

        return response()->json($post);
    }

    /**
     * Display the post which is liked by a user.
    */
    public function showLikedPostOfUser(string $id): JsonResponse
    {
        $checkIfUserExists = User::find($id);
        if (!$checkIfUserExists) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng này !'
            ], 404);
        }

        $like = Like::where('user_id',$id)->get();

        $post = Post::where('post_id', $like->like_id)->get();

        return response()->json($post);
    }

    /**
     * Display the comment which is owned by a user.
    */
    public function showCommentOfUser(string $id): JsonResponse
    {
        $checkIfUserExists = User::find($id);
        if (!$checkIfUserExists) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng này !'
            ], 404);
        }

        $comment = Comment::where('user_id',$id)->get();

        return response()->json($comment);
    }

    /**
     * Change the user profile.
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
