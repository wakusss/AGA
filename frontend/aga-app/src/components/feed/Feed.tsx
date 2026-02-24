import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PostCard from "../posts/Post";
function Feed() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto pt-6 md:pt-8 pb-12 px-4 sm:px-6 lg:px-8">
          {/* Поисковая панель в карточке */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6 mb-8">
            <div className="relative">
              {/* Иконка лупы слева */}
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
                placeholder="Search posts..."
                className="h-10 w-full rounded-full pl-10 pr-28 text-sm focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />

              {/* Кнопка Search справа внутри */}
              <Button
                size="sm"
                className="
            absolute right-1.5 top-1/2 -translate-y-1/2 
            h-8 px-4 rounded-full 
            bg-primary text-primary-foreground
            bg-sky-600 hover:bg-sky-700 
            hover:bg-primary/90 
            focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            ]bg-sky-600 hover:bg-sky-700

          "
              >
                Search
              </Button>
            </div>
          </div>

          {/* Здесь дальше твой контент (посты, профиль и т.д.) */}
          <PostCard
            post={{
              author: {
                id: 1,
                name: "Maksim Utkin",
                avatar: "https://picsum.photos/seed/${i}/200/100",
              },
              id: 1,
              content: "Hello, this is Maksim",
              createAt: new Date(),
              image: "https://picsum.photos/seed/maksim/600/400",
              likesCount: 10,
              isLikedByCurrentUser: false,
            }}
          />
          <PostCard
            post={{
              author: {
                id: 2,
                name: "Mikita Savanovich",
                avatar: "https://picsum.photos/seed/${i}/200/100",
              },
              id: 2,
              content: "Hello, this is Mikita",
              createAt: new Date(),
              image: "https://picsum.photos/seed/mikita/600/400",
              likesCount: 16,
              isLikedByCurrentUser: true,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Feed;
