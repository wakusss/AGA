import React from "react";

export default function NavBar() {
  return (
    <>
      <nav className="navbar grid grid-cols-2 text-purple-700">
        <div className="navbar-logo">
          <h1 className="text-5xl pl-8">
            <a href="/feed">AGA Chat</a>
          </h1>
        </div>
        <ul className="flex space-x-4 grid grid-cols-3">
          <li className="text-xl font-bold text-center">
            <a href="/feed">Feed</a>
          </li>
          <li className="text-xl font-bold text-center">
            <a href="/profile">Profile</a>
          </li>
          <li className="text-xl font-bold text-center">
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
