import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Articles } from "./Articles";
import { Article } from "./Article";
import { getArticles } from "./ApiCalls"

function App() {
  const [isLoading, setIsLoading] = useState(true)
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
        <Route path="/articles" element={<Articles articles={articles} isLoading={isLoading}/>}></Route>
        <Route path="/articles/:article_id" element={<Article isLoading={isLoading} setIsLoading={setIsLoading}/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
