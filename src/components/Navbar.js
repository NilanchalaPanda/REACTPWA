import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

  const navItems = [
    { id: 1, text: "Home", to: "/home" },
    { id: 2, text: "Add New User", to: "/add_user" },
  ];

  return (
    <nav className="z-100 bg-gray-900 flex justify-between items-center h-24 mx-auto px-4 md:px-24 text-white">
      {/* Logo */}
      <NavLink to="/home" className="flex justify-center items-center">
        <h1 className="block text-2xl font-bold">PALCOA</h1>
      </NavLink>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex md:items-center md:justify-center">
        {navItems.map((item) => (
          <li
            key={item.id}
            className="px-4 py-2 p-4 rounded-xl m-2 cursor-pointer duration-300 hover:bg-gray-800"
          >
            <NavLink to={item.to}>{item.text}</NavLink>
          </li>
        ))}
        <NavLink
          to="/login"
          onClick={handleLogout}
          className={
            "px-4 py-2 bg-blue-500 rounded-xl m-2 cursor-pointer duration-300 font-semibold"
          }
        >
          Logout
        </NavLink>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-gray-900 ease-in-out duration-500 z-20 pt-10 text-center"
            : "ease-in-out w-[60%] duration-600 fixed top-0 bottom-0 left-[-100%] z-20 pt-10"
        }
      >
        {/* Mobile Logo */}
        <NavLink to="/home" className="flex justify-center items-center">
          <h1 className="block text-2xl font-bold md:hidden">PALCOA</h1>
        </NavLink>

        <hr className="mt-4" />

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="pt-10 px-4 flex text-center flex-col text-2xl rounded-xl duration-300 cursor-pointer border-gray-600"
          >
            <NavLink to={item.to}>{item.text}</NavLink>
          </li>
        ))}
        <NavLink
          to="/login"
          className={
            "mt-10 py-2 mx-10 px-4 flex text-center flex-col text-2xl rounded-xl duration-300 cursor-pointer bg-blue-500"
          }
        >
          Logout
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
