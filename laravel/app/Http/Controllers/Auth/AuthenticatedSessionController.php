<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
// use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        /**
         * @var \App\Models\User $user
         */
        $user = Auth::user();

        // Check if the user already has an active token
        $token = $user->tokens()->where('name', $user->display_name)->first();

        if (!$token) {
            // Create a new token if none exists
            $token = $user->createToken($user->display_name)->plainTextToken;
        }

        return response()->json([
            'user' => $user,
            'message' => 'Người dùng ' . $user->display_name . ' đăng nhập thành công !',
            'token' => $token,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): JsonResponse
    {
        $user = Auth::user();

        // Check if the user is authenticated
        if (!$user) {
            return response()->json([
                'message' => 'Không có người dùng nào để đăng xuất !',
            ], 401);
        }

        $user->tokens()->delete();

        Auth::guard('web')->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return response()->json([
            'message' => 'Người dùng ' . $user->display_name . ' đăng xuất thành công !',
        ]);
    }
}
