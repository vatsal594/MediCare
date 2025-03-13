import React, { useContext, useState, useCallback, useMemo } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import clsx from "clsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = useCallback(() => {
    localStorage.clear();
    setToken(false);
    navigate("/login");
  }, [navigate, setToken]);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const menuItems = useMemo(
    () => [
      { path: "/", label: "HOME" },
      { path: "/doctors", label: "DOCTORS" },
      { path: "/about", label: "ABOUT" },
      { path: "/contact", label: "CONTACT" },
      { path: "/symptom-checker", label: "SYMPTOM CHECKER" },
      { path: "/health-education", label: "HEALTH EDUCATION" },
      { path: "http://localhost:5175/", label: "ADMIN LOGIN", target: "_blank" },
    ],
    []
  );

  return (
    <nav className="flex items-center justify-between text-sm py-2 mb-5">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-32 md:w-28 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="md:flex items-start gap-4 font-medium hidden">
        {menuItems.map(({ path, label, target }, index) => (
          <NavLink
            key={index}
            to={path}
            target={target}
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

      {/* User & Mobile Menu */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                className="w-12 h-12 rounded-full border-2 border-blue-500"
                src={userData.image}
                alt="User"
              />
              <p className="text-gray-700 font-medium hidden md:block">
                {userData.name}
              </p>
              <img
                className={`w-3 transition-transform ${
                  showDropdown ? "rotate-180" : "rotate-0"
                }`}
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate("/my-profile")}
                  className="block px-4 py-2 w-full text-left hover:bg-blue-100 rounded-t-lg"
                >
                  👤 My Profile
                </button>
                <button
                  onClick={() => navigate("/my-appointments")}
                  className="block px-4 py-2 w-full text-left hover:bg-blue-100"
                >
                  📅 My Appointments
                </button>
                <button
                  onClick={logout}
                  className="block px-4 py-2 w-full text-left text-red-600 hover:bg-red-100 rounded-b-lg"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <img className="w-6" src={assets.menu_icon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}
        >
          <div
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <img src={assets.logo} className="w-28" alt="Logo" />
              <button onClick={toggleMenu} aria-label="Close menu">
                <img src={assets.cross_icon} className="w-7" alt="Close" />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-2 mt-4 px-5 text-lg font-medium">
              {menuItems.map(({ path, label }, index) => (
                <NavLink
                  key={index}
                  to={path}
                  className={({ isActive }) =>
                    clsx(
                      "py-2 w-full text-center",
                      isActive && "text-blue-600 font-semibold"
                    )
                  }
                  onClick={() => setShowMenu(false)}
                >
                  {label}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
