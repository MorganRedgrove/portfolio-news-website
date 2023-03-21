import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { UserProvider, UsersProvider } from "./contexts/contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </UsersProvider>
);
