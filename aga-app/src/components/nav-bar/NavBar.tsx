import React from "react";
import TopNavTabs from "./TopNavTabs";

export default function NavBar() {
  return (
    <>
      <nav className="navbar grid grid-cols-2 bg-purple-700 text-white p-7">
        <div className="navbar-logo">
          <h1 className="text-5xl">
            <a href="/feed">AGA Chat</a>
          </h1>
        </div>
        <ul className="flex grid grid-cols-3">
          <TopNavTabs href="/feed" label="Feed" />
          <TopNavTabs href="/profile" label="Profile" />
          <TopNavTabs href="/settings" label="Settings" />
        </ul>
      </nav>
    </>
  );
}
