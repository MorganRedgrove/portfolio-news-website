import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { LoadingProvider } from "./contexts/Loading";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoadingProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoadingProvider>
);
