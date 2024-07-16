import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {

  const { setUser, csrfToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const validateFormInput = async (event) => {
    event.preventDefault();

    let inputError = {
      email: "",
      password: "",
    };

    if (!email && !password) {
      setFormError({
        ...inputError,
        email: "Hình như bạn quên nhập địa chỉ email !",
        password: "Không nên để trống mật khẩu bạn nhé !",
      });

      return;
    }

    if (!email) {
      setFormError({
        ...inputError,
        email: "Địa chỉ email có vẻ không hợp lệ cho lắm !",
      });
      return;
    }

    if (!password) {
      setFormError({
        ...inputError,
        password: "Bạn quên nhập mật khẩu rồi !",
      });
      return;
    }

    setFormError(inputError);
    
    await csrfToken();

    const resp = await axios
      .post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            // 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
          },
          withCredentials: true,
          withXSRFToken: true,
        }
      )
      .then((res) => {
        setUser(resp.data.user);
        console.warn("result", res);
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Failed to login:", error);
      });
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Đăng nhập tài khoản của bạn
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="/login"
          method="POST"
          onSubmit={validateFormInput}
        >
          <div>
            <div
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email
            </div>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Nhập email"
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
          sm:leading-6"
              />
              <p className="text-white">{formError.email}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Mật khẩu
              </div>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-semibold text-sky-600 hover:text-sky-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
          sm:leading-6"
              />
              <p className="text-white">{formError.password}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-900 px-3 py-1.5 text-sm 
        font-semibold leading-6 text-white shadow-sm hover:bg-sky-800 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Chưa có tài khoản?
          <Link
            to="/register"
            className="font-semibold leading-6 text-sky-600 hover:text-sky-500 p-2"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
