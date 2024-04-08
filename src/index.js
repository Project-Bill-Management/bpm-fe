import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </HashRouter>
);
