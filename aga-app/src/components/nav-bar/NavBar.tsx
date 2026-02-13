import React from "react";
import { useState } from "react";
import TopNavTabs from "./TopNavTabs";

export default function NavBar() {
  const [isOpenHamburgerButton, setIsOpenHamburgerButton] = useState(false);
  return (
    <>
      <nav className="bg-purple-700 text-white p-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div>
              <h1 className="text-[clamp(1.5rem,5vw+2rem,3rem)] text-left max-w-[min(80vw,24rem)]">
                <a href="/feed">AGA Chat</a>
              </h1>
            </div>
            {/* Desktop Links */}
            <div className="w-full hidden min-[800px]:block">
              <ul className="grid grid-cols-3 justify-items-center flex">
                <TopNavTabs href="/feed" label="Feed" />
                <TopNavTabs href="/profile" label="Profile" />
                <TopNavTabs href="/settings" label="Settings" />
              </ul>
            </div>
            {/* Mobile Links (Hamburger menu) */}
            <button
              className="text-6xl max-[800px]:block hidden"
              onClick={() => setIsOpenHamburgerButton(!isOpenHamburgerButton)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
