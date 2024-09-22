<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email:rfc,strict,dns', 'exists:users, email'],
            'password' => [
                'required'
                ,
                'min:8'
                ,
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'
            ],
            'password_confirmation' => ['same:password'],
        ],[
            'email.required' => 'Email không được bỏ trống !',
            'email.email' => 'Email không hợp lệ !',
            'email.exists' => 'Email không tồn tại trong dữ liệu của chúng tôi !',

            'password.required' => 'Mật khẩu không được để trống !',
            'password.min' => 'Mật khẩu không được dưới 8 ký tự !',
            'password.regex' => 'Mật khẩu phải bao gồm ít nhất 1 ký tự viết hoa, 1 ký tự thường và 1 ký tự đặc biệt',
            
            'password_confirmation.same' => 'Mật khẩu nhập lại không trùng khớp !'
        ]);

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->string('password')),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status != Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        }

        return response()->json(['status' => __($status)]);
    }
}
