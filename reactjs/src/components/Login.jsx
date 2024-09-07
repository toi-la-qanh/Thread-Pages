import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { user, setUser, csrfToken } = useAuth();
  const [email, setEmail] = useState(() => user?.email || "");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const validateFormInput = async (event) => {
    event.preventDefault();

    csrfToken();

    try {
      const result = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: {
            Accept: "application/json",
          },
        }
      );
      setUser(result.data.user);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          console.log("Unauthorized access:", error.response);
          setFormError({
            email: error.response.data.errors.email,
            password: error.response.data.errors.password,
          });
        } else {
          console.error("Failed to login:", error.response);
        }
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  return (
    <div className="flex text-black w-full flex-col justify-center items-center">
      <div className="overflow-auto h-auto rounded-xl border-black border lg:w-1/3 p-5 md:w-1/2 sm:w-2/3 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold">
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
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon className="text-2xl" icon={faEnvelope} />
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                type="email"
                autoComplete="on"
                placeholder="Nhập email"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
          sm:leading-6"
              />
            </div>
            <p className="text-red-800">{formError.email}</p>

            <div className="flex justify-end text-sm">
              <Link
                to="#"
                className="font-semibold text-sky-600 hover:text-sky-500"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon className="text-2xl" icon={faLock} />
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Nhập mật khẩu..."
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
          sm:leading-6"
              />
            </div>
            <p className="text-red-800">{formError.password}</p>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md bg-black h-9 text-base 
        font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Đăng nhập
              </button>
            </div>
          </form>

          <p className="flex justify-between mt-10 text-sm text-gray-500">
            Chưa có tài khoản?
            <Link
              to="/register"
              className="font-semibold text-sky-600 hover:text-sky-500"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
