import "./App.scss";

import { Route, Routes } from "react-router-dom";

import { Home } from "./routes/Home";
import { Articles } from "./routes/Articles";
import { Article } from "./routes/Article";
import { Comments } from "./routes/Comments";
import { Topics } from "./routes/Topics";
import { Error } from "./components/Error";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/:topic" element={<Articles />}></Route>
        <Route path="/articles/id/:article_id" element={<Article />}></Route>
        <Route
          path="/articles/id/:article_id/comments"
          element={<Comments />}
        ></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="*" element={<Error code={404} msg="Not Found" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
