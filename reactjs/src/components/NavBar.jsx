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
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const [components, setComponents] = useState(false);
  const {user} = useAuth();

  const Components = [
    {
      icon: (
        <FontAwesomeIcon
          className="px-1 text-2xl"
          icon={faHome}
        />
      ),
      link: "/",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faSearch} />,
      link: "/search",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faNewspaper} />,
      link: "/post",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faHeart} />,
      link: "/notification",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faUser} />,
      link: `/profile/${user.user_id}`,
    },
  ];

  return (
    <>
      <div className="flex top-0 sticky shadow-sm rounded-md z-10 bg-white border-black border-b justify-between px-10 py-2 mx-auto w-full md:items-center md:flex">
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
                      ? "p-2 border-b-2 border-black text-black font-light tracking-wider hover:text-gray-400 ease-out duration-700"
                      : "text-gray-400 font-light tracking-wider hover:text-gray-400 ease-out duration-700"
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
            {/* <Login isOpen={!visible} onClose={() => setVisible(false)} /> */}
            Đăng nhập
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default NavBar;
