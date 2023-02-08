import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { LoadingProvider, UserProvider, VotingProvider } from "./contexts/contexts";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<LoadingProvider>
  <UserProvider>
    <VotingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VotingProvider>
  </UserProvider>
</LoadingProvider>
);
