import React from "react";

// Accept classnames as props
interface NavBarProps {
  className?: string;
}

export default function NavBar({ className }: NavBarProps) {
  return <div className={`navbar bg-base-100 border-solid border-b-2 border-indigo-600 rounded-none ${className}`}>
    <div className="navbar-start">
      <ul className="menu menu-horizontal px-1">
        <li><a className="btn btn-ghost">About</a></li>
        <li><a className="btn btn-ghost">Blog</a></li>
        <li><a className="btn btn-ghost">Astrophotography</a></li>
      </ul>
    </div>

    <div className="navbar-center">
      <a className="text-2xl">Zong's Blog</a>
    </div>

    <div className="navbar-end">
      <a className="btn btn-ghost">Login</a>
      <a className="btn btn-ghost">Sign Up</a>
    </div>
  </div>
}