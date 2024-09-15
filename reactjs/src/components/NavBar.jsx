import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMoon,
  faNewspaper,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [components, setComponents] = useState(false);
  const Components = [
    {
      icon: (
        <FontAwesomeIcon
          className="px-1 text-xl"
          icon={faHome}
        />
      ),
      link: "/",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faSearch} />,
      link: "/search",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faNewspaper} />,
      link: "/post",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faHeart} />,
      link: "/notification",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faUser} />,
      link: "/profile",
    },
  ];

  return (
    <>
      <div className="flex shadow-sm rounded-md top-0 fixed z-10 bg-white border-black border-b justify-between px-10 py-2 mx-auto w-full md:items-center md:flex">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <NavLink
            to="/"
            className="text-3xl text-black-50 font-mono tracking-[0.1rem]"
          >
            23:59'
            <FontAwesomeIcon className="px-1" icon={faMoon} />
          </NavLink>
        </div>
        <div
          className={`flex items-center md:block ${
            components ? "block" : "hidden"
          }`}
        >
          <ul className="list-none lg:flex md:flex sm:block block gap-x-14">
            {Components.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "p-2 border-b-2 border-black text-gray-600 text-[1.15rem] font-light tracking-wider hover:text-gray-400 ease-out duration-700"
                      : "text-black text-[1.15rem] font-light tracking-wider hover:text-gray-400 ease-out duration-700"
                  }
                >
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-black text-[1rem] font-medium border shadow bg-gray-300 rounded-xl py-2 px-3 tracking-wider"
                : "text-black text-[1rem] font-medium border shadow shadow-gray-400 rounded-xl py-2 px-3 tracking-wider hover:bg-gray-300 ease-out duration-700 "
            }
          >
            Đăng nhập
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
