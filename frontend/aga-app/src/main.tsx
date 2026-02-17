import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  // { path: "/", element: <App /> },
  { path: "/profile", element: <App /> }, // temporary, will be replaced with actual profile page
  { path: "/signin", element: "" },
  { path: "/signup", element: "" },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
