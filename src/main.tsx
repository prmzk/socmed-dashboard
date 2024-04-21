import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="bg-slate-700 min-h-svh">
        <div className="container px-4 mx-auto">
          <h1 className="text-white text-xl font-bold py-8 border-b border-white">
            Social Media Dashboard
          </h1>
          <RouterProvider router={router} />
        </div>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
