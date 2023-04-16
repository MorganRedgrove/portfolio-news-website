import { Container } from "react-bootstrap";
import { Banner } from "./Banner";
import { Footer } from "./Footer";

export const Error = ({ code, msg }) => {
  return (
    <>
      <Banner />

      <Container className="content">
        <h1 className="text-primary fs-1 mb-0">{code}</h1>
        <h1>{msg}</h1>
      </Container>

      <Footer />
    </>
  );
};
