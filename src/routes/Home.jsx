import { Link } from "react-router-dom";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <body>
      <Banner />

      <div class="content">
        <h1>Welcome to NC News</h1>
      </div>

      <Footer />
    </body>
  );
};
