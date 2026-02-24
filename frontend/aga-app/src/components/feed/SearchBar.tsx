"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search posts...",
  onSearch,
}: SearchBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScrollY && current > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(current <= 0 ? 0 : current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed inset-x-0 top-0 z-50
        bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
        border-b border-border shadow-sm
        transition-all duration-300 ease-in-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            placeholder={placeholder}
            className="
              h-10 w-full rounded-full 
              pl-10 pr-28 
              text-sm 
              bg-background 
              border-input 
              focus-visible:ring-ring focus-visible:ring-offset-2
            "
          />

          <Button
            size="sm"
            className="
              absolute right-1.5 top-1/2 -translate-y-1/2 
              h-8 px-5 rounded-full 
              bg-primary text-primary-foreground 
              hover:bg-primary/90 
              shadow-sm
            "
            onClick={() => onSearch?.("")} // заглушка, потом подключишь реальный поиск
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
