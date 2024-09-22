import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Login from "./Login";

const Register = ({ openRegister }) => {
  const { register, errors } = useAuth();
  const [display_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [login, setLogin] = useState(false);

  const validateFormInput = async (event) => {
    event.preventDefault();
    await register({ display_name, email, password, password_confirmation });
  };

  const openLogin = () => {
    setLogin(true);
    openRegister = false;
  };
  if (login) return <Login isOpen={login} />;
  if (!openRegister) return null;

  return (
    <div
      className={`${
        openRegister ? "flex" : "hidden"
      } mt-10 bg-white overflow-auto max-h-[500px] text-black w-full flex-col justify-center items-center`}
    >
      <div className="rounded-xl border-black border w-[500px] py-5 overflow-auto h-full">
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
                value={display_name}
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
            <p className="text-red-800">{errors?.display_name}</p>
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
            <p className="text-red-800">{errors?.email}</p>
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
            <p className="text-red-800">{errors?.password}</p>
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
            <p className="text-red-800">{errors?.password_confirmation}</p>
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
            <button
              onClick={openLogin}
              className="font-semibold text-sky-600 hover:text-sky-500"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
