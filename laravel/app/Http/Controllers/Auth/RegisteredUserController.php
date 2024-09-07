<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
// use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        // $request->merge(['email' => strtolower($request->input('email'))]);

        $request->validate([
            'username' => ['required', 'string', 'regex:/^[A-Za-z][A-Za-z0-9]*$/', 'min:5', 'max:20'],
            'display_name' => ['required', 'string', 'regex:/^[\p{L}\sà-ỹÀ-Ỵ]+$/u', 'min:6', 'max:30'],
            'email' => [
                'required',
                'string',
                'email:rfc,strict,dns',
                'max:254'
                ,
                'unique:' . User::class
            ],
            'password' => [
                'required'
                ,
                'min:8'
                ,
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/'
            ],
            'password_confirmation' => ['same:password'],
        ], [
            'username.required' => 'Tên tài khoản không được để trống !',
            'username.regex' => 'Tên tài khoản phải bắt đầu là chữ !',
            'username.min' => 'Tên tài khoản tối thiểu 5 ký tự !',
            'username.max' => 'Tên tài khoản tối đa 20 ký tự !',

            'display_name.required' => 'Tên hiển thị không được để trống !',
            'display_name.regex' => 'Tên hiển thị chỉ bao gồm chữ !',
            'display_name.min' => 'Tên hiển thị tối thiểu 6 ký tự !',
            'display_name.max' => 'Tên hiển thị tối đa 30 ký tự !',

            'email.required' => 'Email không được để trống !',
            'email.email' => 'Email không hợp lệ !',
            'email.max' => 'Email không được vượt quá 254 ký tự !',
            'email.unique' => 'Email đã tồn tại !',

            'password.required' => 'Mật khẩu không được để trống !',
            'password.min' => 'Mật khẩu không được dưới 8 ký tự !',
            'password.regex' => 'Mật khẩu phải bao gồm ít nhất 1 ký tự viết hoa, 1 ký tự thường và 1 ký tự đặc biệt',
            
            'password_confirmation.same' => 'Mật khẩu nhập lại không trùng khớp !'
        ]);

        $user = User::create([
            'username' => $request->username,
            'display_name' => $request->display_name,
            'email' => $request->email,
            'password' => Hash::make($request->input('password')),
        ]);

        event(new Registered($user));

        // $user->sendEmailVerificationNotification();

        Auth::login($user);

        return response()->json([
            'message' => 'Tạo tài khoản thành công !',
            'email' => $user->email,
            'token' => $user->createToken($user->user_id)->plainTextToken,
        ]);

    }
}
