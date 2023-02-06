import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Articles } from "./Articles";
import { getArticles } from "./ApiCalls"

function App() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles()
        .then((articles) => {
            setArticles(articles)
        })
}, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/articles" element={<Articles articles={articles}/>}></Route>
      </Routes>
    </div>
  )
}

export default App;
