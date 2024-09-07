import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const { setUser, csrfToken } = useAuth();
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

    csrfToken();

    try {
      const result = await axios.post(
        "http://localhost:8000/api/register",
        {
          display_name: name,
          email,
          password,
          password_confirmation,
        },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: {
            Accept: "application/json",
          },
        }
      );
      setUser({
        email: result.data.user.email,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setFormError({
          name: error.response.data.errors.display_name,
          email: error.response.data.errors.email,
          password: error.response.data.errors.password,
          password_confirmation:
            error.response.data.errors.password_confirmation,
        });
        if (error.response.status === 422) {
          console.log("Unauthorized access:", error.response);
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
      <div className="rounded-xl border-black border lg:w-1/3 p-5 md:w-1/2 sm:w-2/3 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold">Đăng ký tài khoản</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="leading-10 space-y-6"
            action="/register"
            method="POST"
            onSubmit={validateFormInput}
          >
            <div className="flex gap-5 items-center">
              <FontAwesomeIcon className="text-2xl" icon={faUser} />
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                type="text"
                autoComplete="on"
                placeholder="Nhập tên đầy đủ để hiển thị"
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
          sm:leading-6"
              />
            </div>
            <p className="text-red-800">{formError.name}</p>
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
            <div className="flex gap-5 items-center">
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
            <div className="flex gap-5 items-center">
              <FontAwesomeIcon className="text-2xl" icon={faLock} />
              <input
                value={password_confirmation}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
                name="password_confirmation"
                type="password"
                autoComplete="current-password"
                placeholder="Nhập lại mật khẩu..."
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset 
          ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
          sm:leading-6"
              />
            </div>
            <p className="text-red-800">{formError.password_confirmation}</p>
            <button
              type="submit"
              className="flex w-full justify-center items-center rounded-md bg-black h-9 text-base 
        font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline 
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Đăng ký
            </button>
          </form>

          <p className="flex justify-between mt-10 text-sm text-gray-500">
            Đã có tài khoản?
            <Link
              to="/login"
              className="font-semibold text-sky-600 hover:text-sky-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
