import { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

import { UserContext } from "../contexts/contexts";
import { OffCanvas } from "./OffCanvas";

export const Banner = () => {
  const {
    user: { username, avatar_url, name },
  } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Navbar
      key="md"
      bg="primary"
      variant="dark"
      expand="md"
      className="mb-3"
      on
      onToggle={() => {
        setShowMenu(true);
        setShow(true);
      }}
    >
      <Container fluid>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={solid("globe")} /> Northcoders News
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Nav className="d-none d-md-flex align-items-center justify-content-start flex-grow-1 ps-3">
          <Nav.Link href="/articles">Articles</Nav.Link>

          <NavDropdown title="Topics">
            <NavDropdown.Item href="/articles/coding">Coding</NavDropdown.Item>
            <NavDropdown.Item href="/articles/cooking">
              Cooking
            </NavDropdown.Item>
            <NavDropdown.Item href="/articles/football">
              Football
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="d-none d-md-flex align-items-center justify-content-end flex-grow-1 pe-3">
          {username === "guest" ? (
            <Nav.Link
              href=""
              onClick={() => {
                setShowLogin(true);
                setShow(true);
              }}
            >
              Login
            </Nav.Link>
          ) : (
            <Nav.Link href="">{username}</Nav.Link>
          )}

          <Image
            src={avatar_url}
            alt={username}
            roundedCircle={true}
            width={35}
            height={35}
          />
        </Nav>

        <OffCanvas
          show={show}
          setShow={setShow}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          username={username}
          name={name}
          avatar_url={avatar_url}
        />
      </Container>
    </Navbar>
  );
};
