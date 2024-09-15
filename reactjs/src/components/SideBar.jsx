import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMoon,
  faNewspaper,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [components, setComponents] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const Components = [
    {
      name: "Home",
      icon: (
        <FontAwesomeIcon
          className="px-1 text-2xl focus:border-b"
          icon={faHome}
        />
      ),
      link: "/",
    },
    {
      name: "Search",
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faSearch} />,
      link: "/search",
    },
    {
      name: "Post",
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faNewspaper} />,
      link: "/post",
    },
    {
      name: "Notification",
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faHeart} />,
      link: "/notification",
    },
    {
      name: "Profile",
      icon: <FontAwesomeIcon className="px-1 text-2xl" icon={faUser} />,
      link: "/profile",
    },
  ];

  const getCurrentComponentName = (path) => {
    const component = Components.find((comp) => comp.link === path);
    if (component) {
      return component.name;
    }
    return null;
  };

  const currentComponentName = getCurrentComponentName(currentPath);

  return (
    <>
      <div className="top-0 sticky z-10 bg-gray-50">
        <div className="flex flex-row items-center justify-between p-4">
          <NavLink
            to="/"
            className="text-3xl text-black-50 font-mono tracking-[0.1rem]"
          >
            23:59'
            <FontAwesomeIcon className="px-1" icon={faMoon} />
          </NavLink>
          <div className="w-7">{currentComponentName}</div>
          <div className="w-48">{}</div>
        </div>

        <div
          className="absolute w-16 top-20 h-96 md:flex hidden" 
        >
          <ul className="flex flex-col list-none justify-between w-full h-full">
            {Components.map((item, index) => (
              <li className="w-full h-12" key={index}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-300 flex items-center justify-center w-full h-full font-light tracking-wider text-gray-600 ease-out duration-700"
                      : "flex items-center justify-center w-full h-full font-light tracking-wider hover:bg-gray-300 ease-out duration-700"
                  }
                >
                  {item.icon}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
