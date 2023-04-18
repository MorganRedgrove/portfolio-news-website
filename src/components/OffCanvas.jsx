import { useContext } from "react";

import { Image, Form, Button, Nav, NavDropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

import { OffCanvasContext } from "../contexts/contexts";

export const OffCanvas = ({ username, name, avatar_url }) => {
  const {
    offCanvas: { show, content },
    setOffCanvas,
  } = useContext(OffCanvasContext);

  const handleClose = () => {
    setOffCanvas({ show: false, content: null });
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className="p-4" closeButton>
        <Image
          src={avatar_url}
          alt={username}
          roundedCircle={true}
          width={45}
          height={45}
        />
        <Offcanvas.Title className="fs-4">{name}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-4 fs-5">
        {content === "menu" ? (
          <Nav>
            <Nav.Link href="/articles">Articles</Nav.Link>
            <NavDropdown title="Topics" className="w-50 m-auto">
              <NavDropdown.Item className="text-center" href="/articles/coding">
                Coding
              </NavDropdown.Item>
              <NavDropdown.Item
                className="text-center"
                href="/articles/cooking"
              >
                Cooking
              </NavDropdown.Item>
              <NavDropdown.Item
                className="text-center"
                href="/articles/football"
              >
                Football
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : null}

        {content === "login" ? (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary">Login</Button>
          </Form>
        ) : null}

        {content === "user" ? <p>Placeholder for user profile</p> : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
