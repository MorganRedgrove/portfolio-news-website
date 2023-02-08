import "./App.css";

import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./Home";
import { Articles } from "./Articles";
import { Article } from "./Article";
import { Comments } from "./Comments";

import { getArticles } from "./ApiCalls"

import { LoadingContext } from "./contexts/Loading";


function App() {
  const { isLoading, setIsLoading } = useContext(LoadingContext)

  const [articles, setArticles] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getArticles()
        .then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
}, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles articles={articles}/>}></Route>
        <Route path="/articles/:article_id" element={<Article/>}></Route>
        <Route path="/articles/:article_id/comments" element={<Comments/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
