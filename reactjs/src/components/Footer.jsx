import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faNewspaper,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [components, setComponents] = useState(false);
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
      <div className="flex shadow-sm rounded-md z-10 border-black border-t bg-white px-7 py-5 mx-auto w-full lg:hidden md:hidden fixed bottom-0">
          <ul className="list-none flex w-full flex-row justify-between">
            {Components.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="text-slate-600 text-[1.15rem] font-light tracking-wider hover:text-gray-400 
                    ease-out duration-700"
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </>
  );
};

export default NavBar;
