import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [components, setComponents] = useState(false);
  const Components = [
    {
      name: "Trang cá nhân",
      link: "/profile",
    },
    {
      name: "Bài đăng",
      link: "/post",
    },
    {
      name: "Giới thiệu",
      link: "/about",
    },
  ];

  return (
    <>
      <nav className="w-full h-auto bg-gray-800 lg:px-24 md:px-16 sm:px-14 px-12 py-2 shadow-md">
        <div className="justify-between mx-auto lg:w-full md:items-center md:flex">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link
                to="/"
                className="text-3xl text-stone-50 font-mono tracking-[0.1rem]"
              >
                23:59'
                <FontAwesomeIcon className="px-1" icon={faMoon} />
              </Link>
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none border border-transparent 
                  focus:border-gray-400 focus:border"
                  onClick={() => setComponents(!components)}
                >
                  {components ? (
                    <FaTimes
                      className="text-gray-400 cursor-pointer"
                      size={24}
                    />
                  ) : (
                    <FaBars
                      className="text-gray-400 cursor-pointer"
                      size={24}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`flex justify-between items-center md:block ${
              components ? "block" : "hidden"
            }`}
          >
            <ul className="list-none lg:flex md:flex sm:block block gap-x-5 gap-y-16">
              <Link to="">
                <input
                  type="text"
                  placeholder="Tìm kiếm gì đó..."
                  className="p-1 rounded-lg font-mono"
                />
                <FontAwesomeIcon
                  className="px-2 text-stone-50 text-xl"
                  icon={faMagnifyingGlass}
                />
              </Link>
              {Components.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-gray-400 text-[1.15rem] font-medium tracking-wider hover:text-gray-200 
                    ease-out duration-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <Link
                to="/login"
                className="text-sky-400 text-[1.15rem] font-medium tracking-wider hover:text-sky-200 
                    ease-out duration-700"
              >
                <button>Đăng nhập</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
