import { useContext } from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { OffCanvasContext, UserContext } from "../contexts/contexts";

import { OffCanvas } from "./OffCanvas";

export const Banner = () => {
  const {
    user: { username, avatar_url, name },
  } = useContext(UserContext);

  const { setOffCanvas } = useContext(OffCanvasContext);
  const { setUser } = useContext(UserContext);

  return (
    <Navbar
      key="md"
      bg="primary"
      variant="dark"
      expand="md"
      className="mb-3"
      onToggle={() => {
        setOffCanvas({ show: true, content: "menu" });
      }}
    >
      <Container>
        <Navbar.Brand className="fs-3" as={Link} to="/">
          <FontAwesomeIcon icon={icon({ name: "globe" })} /> Northcoders News
        </Navbar.Brand>

        <Navbar.Toggle />

        <Nav className="d-none d-md-flex align-items-center justify-content-start flex-grow-1 fs-5">
          <Nav.Link as={Link} to="/articles">
            Articles
          </Nav.Link>

          <NavDropdown title="Topics">
            <NavDropdown.Item as={Link} to="/articles/coding">
              Coding
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/articles/cooking">
              Cooking
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/articles/football">
              Football
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="d-none d-md-flex align-items-center justify-content-end flex-grow-1 pe-3 fs-5">
          {username === "guest" ? (
            <>
              <Nav.Link
                href=""
                onClick={() => {
                  setOffCanvas({ show: true, content: "login" });
                }}
              >
                Login
              </Nav.Link>

              <Nav.Link
                href=""
                onClick={() => {
                  setOffCanvas({ show: true, content: "login" });
                }}
              >
                <Image
                  src={avatar_url}
                  alt={username}
                  roundedCircle={true}
                  width={35}
                  height={35}
                />
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                href=""
                onClick={() => {
                  setOffCanvas({ show: true, content: "user" });
                }}
              >
                {name}
              </Nav.Link>

              <Nav.Link
                title="Logout"
                href=""
                onClick={() => {
                  setUser({
                    username: "guest",
                    name: "Guest",
                    avatar_url: require("../assets/user-avatar-placeholder.webp"),
                    permission: false,
                  });
                }}
              >
                <FontAwesomeIcon icon={icon({ name: "right-from-bracket" })} />
              </Nav.Link>

              <Nav.Link
                href=""
                onClick={() => {
                  setOffCanvas({ show: true, content: "user" });
                }}
              >
                <Image
                  src={avatar_url}
                  alt={username}
                  roundedCircle={true}
                  width={35}
                  height={35}
                />
              </Nav.Link>
            </>
          )}
        </Nav>

        <OffCanvas username={username} name={name} avatar_url={avatar_url} />
      </Container>
    </Navbar>
  );
};
