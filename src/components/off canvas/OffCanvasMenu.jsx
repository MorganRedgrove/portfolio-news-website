import { Link } from "react-router-dom";

import { Nav, NavDropdown } from "react-bootstrap";

export const OffCanvasMenu = ({ setOffCanvas, closeHandler }) => {
  return (
    <>
      <Nav>
        <Nav.Link onClick={() => closeHandler()} as={Link} to="/articles">
          Articles
        </Nav.Link>
        <NavDropdown title="Topics" className="w-50 m-auto">
          <NavDropdown.Item
            className="text-center"
            onClick={() => closeHandler()}
            as={Link}
            to="/articles/coding"
          >
            Coding
          </NavDropdown.Item>
          <NavDropdown.Item
            className="text-center"
            onClick={() => closeHandler()}
            as={Link}
            to="/articles/cooking"
          >
            Cooking
          </NavDropdown.Item>
          <NavDropdown.Item
            className="text-center"
            onClick={() => closeHandler()}
            as={Link}
            to="/articles/football"
          >
            Football
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Link
          className="link-primary mt-5"
          title="Login"
          onClick={() => setOffCanvas({ show: true, content: "login" })}
        >
          Login
        </Nav.Link>
      </Nav>
    </>
  );
};
