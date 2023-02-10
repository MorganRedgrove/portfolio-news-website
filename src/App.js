import "./App.css";

import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Articles } from "./Articles";
import { Article } from "./Article";
import { Comments } from "./Comments";
import { Topics } from "./Topics";
import { Login } from "./contexts/Login";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles/>}></Route>
        <Route path="/articles/:topic" element={<Articles/>}></Route>

        <Route path="/articles/id/:article_id" element={<Article/>}></Route>

        <Route path="/articles/id/:article_id/comments" element={<Comments/>}></Route>
        <Route path="/topics" element={<Topics/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
