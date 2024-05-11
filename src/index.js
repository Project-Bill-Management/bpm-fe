import React from "react";
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

render(
  <HashRouter>
    <SoftUIControllerProvider>
      <App />
    </SoftUIControllerProvider>
  </HashRouter>,
  document.getElementById("root")
);
