import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faNewspaper,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  // const [components, setComponents] = useState(false);
  const { user } = useAuth();
  const Components = [
    {
      icon: (
        <FontAwesomeIcon
          className="px-1 text-3xl focus:border-b"
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
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faPlus} />,
      link: "/create-post",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faHeart} />,
      link: "/notification",
    },
    {
      icon: <FontAwesomeIcon className="px-1 text-3xl" icon={faUser} />,
      link: `/profile/${user.user_id}`,
    },
  ];

  return (
    <>
      <div className="flex shadow-sm z-10 border-black border-t bg-white h-20 w-full lg:hidden md:hidden fixed bottom-0">
        <ul className="list-none flex w-full flex-row justify-between h-full items-center">
          {Components.map((item, index) => (
            <li className="flex h-full" key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-300 items-center justify-center flex w-24 h-full text-slate-600 font-light tracking-wider ease-out duration-700"
                    : "items-center flex justify-center w-24 text-slate-600 font-light tracking-wider hover:bg-gray-300 ease-out duration-700"
                }
              >
                {item.icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Footer;
