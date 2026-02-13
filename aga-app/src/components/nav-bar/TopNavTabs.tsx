import React from "react";

interface TopNavTabsProps {
  href: string;
  label: string;
}

export default function TopNavTabs(props: TopNavTabsProps) {
  return (
    <>
      <li className="text-xl text-center flex items-center">
        <a href={props.href}>{props.label}</a>
      </li>
    </>
  );
}
