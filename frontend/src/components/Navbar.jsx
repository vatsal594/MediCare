import React, { useContext, useState, useCallback } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import clsx from "clsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  }, [navigate, setToken]);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const menuItems = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
    { path: "/symptom-checker", label: "SYMPTOM CHECKER" }
  ];

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="md:flex items-start gap-5 font-medium hidden">
        {menuItems.map(({ path, label }, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              clsx(
                "py-1",
                isActive &&
                  "relative text-blue-600 font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-600 after:bottom-[-2px] after:left-0"
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-4">
            <p className="text-gray-700 font-medium">Welcome, {userData.name}!</p>
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={userData.image} alt="User" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        <img
          onClick={toggleMenu}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Menu */}
        <div
          className={clsx(
            "md:hidden fixed w-full right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all",
            showMenu ? "h-screen" : "h-0"
          )}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="Logo" />
            <img
              onClick={toggleMenu}
              src={assets.cross_icon}
              className="w-7 cursor-pointer"
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {menuItems.map(({ path, label }, index) => (
              <NavLink
                key={index}
                onClick={() => setShowMenu(false)}
                to={path}
                className={({ isActive }) =>
                  clsx(
                    "py-2",
                    isActive &&
                      "relative text-blue-600 font-semibold after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-blue-600 after:bottom-[-2px] after:left-0"
                  )
                }
              >
                <p className="px-4 py-2 rounded-full inline-block">{label}</p>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
