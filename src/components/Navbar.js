import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-blue-500 text-white">
      <Link to="/home" className="text-xl font-normal">
        PALCOA
      </Link>
      <ul className="flex space-x-4">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/add_user">Add New User</Link>
        </li>
        <li>
          <Link to="/">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
