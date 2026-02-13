import React from "react";

interface HamburgerMenuTabsProps {
  href: string;
  label: string;
}

export default function HamburgerMenuTabs(props: HamburgerMenuTabsProps) {
  return (
    <>
      <li className="text-3xl text-center md:flex py-5">
        <a href={props.href}>{props.label}</a>
      </li>
    </>
  );
}
