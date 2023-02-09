import "./App.css";

import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Articles } from "./Articles";
import { Article } from "./Article";
import { Comments } from "./Comments";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles/>}></Route>
        <Route path="/articles/:article_id" element={<Article/>}></Route>
        <Route path="/articles/:article_id/comments" element={<Comments/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
