"use client";

import { useState, useEffect } from "react";
import throttle from "lodash.throttle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SmartSearchBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 150) {
        setIsVisible(false);
      } else if (current < lastScrollY || current < 100) {
        setIsVisible(true);
      }

      setLastScrollY(current <= 0 ? 0 : current);
    }, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed inset-x-0 z-40
        bg-background/95 backdrop-blur-md
        border-b border-border shadow-sm
        transition-opacity duration-300 ease-out
        will-change-opacity transform-gpu
        ${
          isVisible
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }
      `}
      style={{
        top: "var(--navbar-height, 84px)",
        transform: "translate3d(0, 0, 0)",
        height: "80px",
      }}
    >
      <div className="mt-3 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <Input
            placeholder="Search posts....."
            className="h-10 w-full rounded-full
              pl-10 pr-28 text-sm bg-background
              border-input focus-visible:ring-ring
              focus-visible:ring-offset-2"
          />

          <Button
            size="sm"
            className="
            absolute right-1.5 top-1/2 -translate-y-1/2 
            h-8 px-5 rounded-full 
            bg-sky-600 text-white                 // ← голубой + белый текст
            hover:bg-sky-700                      // ← темнее при наведении
            focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2
            shadow-sm
            "
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
