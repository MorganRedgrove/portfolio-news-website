import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import {
  PermissionsProvider,
  UserProvider,
  UsersProvider,
  VotingProvider,
} from "./contexts/contexts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersProvider>
    <UserProvider>
      <PermissionsProvider>
        <VotingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </VotingProvider>
      </PermissionsProvider>
    </UserProvider>
  </UsersProvider>
);
