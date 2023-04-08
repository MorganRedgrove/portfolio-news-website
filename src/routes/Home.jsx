import { Container } from "react-bootstrap";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <body>
      <Banner />

      <Container className="content">
        <h1>Welcome to NC News</h1>
      </Container>

      <Footer />
    </body>
  );
};
