import { Link } from "react-router-dom";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <div id="content">
        <h1>Welcome to NC News</h1>

        <Link to="/articles">
          <h2>Articles</h2>
        </Link>

        <br />

        <Link to="/topics">
          <h2>Topics</h2>
        </Link>
      </div>

      <Footer></Footer>
    </div>
  );
};
