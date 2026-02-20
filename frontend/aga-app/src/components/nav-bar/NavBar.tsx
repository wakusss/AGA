import { useState } from "react";
import TopNavTabs from "./TopNavTabs";
import HamburgerMenuTabs from "./HamburgerMenuTabs";

export default function NavBar() {
  const [isOpenHamburgerMenuButton, setIsOpenHamburgerMenuButton] =
    useState(false);
  return (
    <>
      <nav className="bg-white p-5">
        <div className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-4 sm:gap-10">
            {/* Logo */}
            <div className="mr-[10%] items-baseline">
              <a href="/feed">
                <img
                  src="../../src/assets/logo.jpg"
                  alt="AGA Chat Logo"
                  className="h-10 sm:h-14 lg:h-auto w-auto object-contain shrink-0 max-w-[220px]"
                />
              </a>
            </div>

            {/* Desktop Links */}
            <div className="w-full hidden min-[900px]:block items-center">
              <ul className="grid grid-cols-3 justify-items-center">
                <TopNavTabs href="/feed" label="Feed" />
                <TopNavTabs href="/profile" label="Profile" />
                <TopNavTabs href="/settings" label="Settings" />
              </ul>
            </div>
            {/* Mobile Links (Hamburger menu) */}
            <button
              className="text-6xl text-[var(--color-primary-light-mode)] max-[900px]:block hidden active:brightness-90 transition-all duration-150 "
              onClick={() =>
                setIsOpenHamburgerMenuButton(!isOpenHamburgerMenuButton)
              }
            >
              ☰
            </button>
          </div>
        </div>

        {isOpenHamburgerMenuButton && (
          <div className="min-[900px]:hidden my-5">
            <ul className="grid grid-cols-1">
              <HamburgerMenuTabs href="/feed" label="Feed" />
              <HamburgerMenuTabs href="/profile" label="Profile" />
              <HamburgerMenuTabs href="/settings" label="Settings" />
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
