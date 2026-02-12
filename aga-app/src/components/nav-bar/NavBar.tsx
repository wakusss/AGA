import React from "react";

export default function NavBar() {
  return (
    <>
      <nav className="navbar grid grid-cols-2 bg-purple-700 text-white p-7">
        <div className="navbar-logo">
          <h1 className="text-5xl">
            <a href="/feed">AGA Chat</a>
          </h1>
        </div>
        <ul className="grid grid-cols-3">
          <li className="text-xl text-center flex items-center">
            <a href="/feed">Feed</a>
          </li>
          <li className="text-xl text-center flex items-center">
            <a href="/profile">Profile</a>
          </li>
          <li className="text-xl text-center flex items-center">
            <a href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
