import React from "react";
import NavBar from "../nav-bar/NavBar";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
    </>
  );
}
