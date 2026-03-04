import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import ProfilePage from "./pages/ProfilePage.tsx";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthorizedRoute from "./components/AuthorizedRoute.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import FeedPage from "./pages/FeedPage.tsx";
import SharedPostPage from "./pages/SharedPostPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "/signin",
    element: <AuthorizedRoute />,
    children: [
      {
        path: "/signin",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <AuthorizedRoute />,
    children: [
      {
        path: "/signup",
        element: <RegistrationPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/feed/:postId",
    element: <SharedPostPage />,
  },
  {
    path: "*",
    element: (
      <div className="p-8 text-center text-2xl">404 — Page Not Found</div>
    ),
  },
  { path: "/feed", element: <FeedPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
