import { Link } from "react-router-dom";
import { Image, Form, Button, Container, Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

export const OffCanvas = ({
  show,
  setShow,
  showMenu,
  setShowMenu,
  showLogin,
  setShowLogin,
  username,
  name,
  avatar_url,
}) => {
  const handleClose = () => {
    setShowMenu(false);
    setShowLogin(false);
    setShow(false);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className="pe-4 ps-4" closeButton>
        <Image
          src={avatar_url}
          alt={name}
          roundedCircle={true}
          width={45}
          height={45}
        />
        <Offcanvas.Title>{name}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="pe-5 ps-5">
        {showMenu ? (
          <p>Placeholder text</p>
        ) : // <Container>
        //   <Nav.Link href="/articles">Articles</Nav.Link>
        //   <Nav.Link href="/topics">Topics</Nav.Link>
        //   <Nav.Link href="/articles/coding">Coding</Nav.Link>
        //   <Nav.Link href="/articles/cooking">Cooking</Nav.Link>
        //   <Nav.Link href="/articles/football">Football</Nav.Link>
        // </Container>
        null}
        {showLogin ? (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
