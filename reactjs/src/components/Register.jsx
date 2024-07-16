import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const validateFormInput = async (event) => {
    event.preventDefault();

    let inputError = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    if (!name && !email && !password) {
      setFormError({
        ...inputError,
        name: "Quên nhập tên rồi bạn ơi",
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

    if (password != password_confirmation) {
      setFormError({
        ...inputError,
        password_confirmation: "Mật khẩu nhập lại không khớp !",
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

    const resp = await axios
      .post(
        "http://localhost:8000/api/register",
        {
          name,
          email,
          password,
          password_confirmation,
        },
        {
          headers: {
            "Content-Type": "application/json",
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
        navigate("/login");
      }, )
      .catch((error) => {
        console.error("Failed to register:", error);
      });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Đăng ký
        </h2>
        <h3 className="text-sm italic text-center pt-1 text-white">
          Để trải nghiệm tất cả các tính năng
        </h3>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={validateFormInput}
          action="/register"
          method="POST"
        >
          <div>
            <div
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-white"
            >
              Tên
            </div>
            <div className="mt-2">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Tên của bạn là ..."
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
              />
              <p className="text-white">{formError.name}</p>
            </div>
          </div>
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
                type="text"
                autoComplete="email"
                placeholder="Email của bạn là ..."
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                sm:text-sm sm:leading-6"
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
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                type="password"
                autoComplete="off"
                placeholder="Mật khẩu của bạn là ..."
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset 
        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
        sm:leading-6"
              />
              <p className="text-white">{formError.password}</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <div
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Nhập lại mật khẩu
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password_confirmation}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                name="cpassword"
                type="password"
                autoComplete="off"
                placeholder="Nhập lại mật khẩu ..."
                className="block w-full rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset 
        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
        sm:leading-6"
              />
              <p className="text-white">{formError.password_confirmation}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold 
            leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 
            focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Đăng Ký
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-400">
          Đã có tài khoản rồi?
          <Link
            to="/login"
            className="font-semibold leading-6 text-sky-600 hover:text-sky-500 p-2"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
