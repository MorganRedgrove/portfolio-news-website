import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Image, Form, Button, Nav, NavDropdown } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { TandC } from "../components/TandC ";

import { OffCanvasContext, UserContext } from "../contexts/contexts";

import { getUser, patchLogin, postUser } from "../utils/ApiCalls";
import { imageChecker } from "../utils/imageChecker";
import { usernameChecker } from "../utils/usernameChecker";
import { nameChecker } from "../utils/nameChecker";
import { passwordChecker } from "../utils/passwordChecker";

export const OffCanvas = ({ username, name, avatar_url }) => {
  const {
    offCanvas: { show, content },
    setOffCanvas,
  } = useContext(OffCanvasContext);

  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    formUsername: null,
    formName: null,
    formPassword: null,
    formAvatar: require("../assets/user-avatar-placeholder.webp"),
    formTandC: null,
  });
  const [warning, setWarning] = useState({
    warningUsername: null,
    warningName: null,
    warningPassword: null,
    warningAvatar: null,
  });
  const [error, setError] = useState(null);

  const { formUsername, formName, formPassword, formAvatar, formTandC } = form;
  const { warningUsername, warningName, warningPassword, warningAvatar } =
    warning;

  const valid =
    formUsername &&
    formName &&
    formPassword &&
    formTandC &&
    !warningUsername &&
    !warningName &&
    !warningPassword;

  const login = (username, password) => {
    patchLogin(username, password)
      .then((match) => {
        if (match) {
          getUser(username).then((user) => {
            setUser(user);
            handleClose();
          });
        }
      })
      .catch((err) => {
        setError("Username or password incorrect");
      });
  };

  const createAccount = (username, password, name, avatar_url) => {
    postUser(username, password, name, avatar_url).then((user) => {
      setUser(user);
    });
  };

  const formHandler = (event, key) => {
    setForm({ ...form, [key]: event.target.value });
  };

  const handleClose = () => {
    setForm({
      formUsername: null,
      formName: null,
      formPassword: null,
      formAvatar: require("../assets/user-avatar-placeholder.webp"),
      formTandC: null,
    });
    setWarning({
      warningUsername: null,
      warningName: null,
      warningPassword: null,
      warningAvatar: null,
    });
    setOffCanvas({ show: false, content: null });
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header className="p-4" closeButton>
        <Image
          className="border border-secondary object-fit-cover"
          src={avatar_url}
          alt={username}
          roundedCircle={true}
          width={45}
          height={45}
        />

        <Offcanvas.Title className="fs-4">
          {name}{" "}
          <Link
            title="Logout"
            to=""
            onClick={() => {
              setUser({
                username: "guest",
                name: "Guest",
                avatar_url: require("../assets/user-avatar-placeholder.webp"),
                permission: false,
              });

              handleClose();
            }}
          >
            {name === "Guest" ? null : (
              <FontAwesomeIcon icon={icon({ name: "right-from-bracket" })} />
            )}
          </Link>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-4 fs-5">
        {content === "menu" ? (
          <>
            <Nav>
              <Nav.Link onClick={() => handleClose()} as={Link} to="/articles">
                Articles
              </Nav.Link>
              <NavDropdown title="Topics" className="w-50 m-auto">
                <NavDropdown.Item
                  className="text-center"
                  onClick={() => handleClose()}
                  as={Link}
                  to="/articles/coding"
                >
                  Coding
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-center"
                  onClick={() => handleClose()}
                  as={Link}
                  to="/articles/cooking"
                >
                  Cooking
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="text-center"
                  onClick={() => handleClose()}
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
        ) : null}

        {content === "login" ? (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                onBlur={(event) => {
                  formHandler(event, "formUsername");
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onBlur={(event) => {
                  formHandler(event, "formPassword");
                }}
              />
            </Form.Group>
            <Button
              sticky="bottom"
              className="mb-1"
              variant="primary"
              onClick={() => login(formUsername, formPassword)}
            >
              Login
            </Button>

            <p>
              {error ? (
                <>
                  {error} <br />
                  please try again <br />
                </>
              ) : null}
              or <br />
              <Link
                to=""
                onClick={() =>
                  setOffCanvas({ show: true, content: "create-account" })
                }
              >
                Create an Account
              </Link>
            </p>
          </Form>
        ) : null}

        {content === "user" ? <p>Placeholder for user profile</p> : null}

        {content === "create-account" ? (
          <>
            {" "}
            <p>Lets make an account!</p>{" "}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>
                  Username<span className="text-primary">*</span>
                </Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  onBlur={(event) => {
                    usernameChecker(event.target.value).then(
                      ({ valid, msg }) => {
                        if (valid) {
                          formHandler(event, "formUsername");
                        }
                        setWarning({ ...warning, warningUsername: msg });
                      }
                    );
                  }}
                />
                <h6 className="text-primary">{warningUsername}</h6>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Name<span className="text-primary">*</span>
                </Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Full Name"
                  onBlur={(event) => {
                    nameChecker(event.target.value).then(({ valid, msg }) => {
                      if (valid) {
                        formHandler(event, "formName");
                      }
                      setWarning({ ...warning, warningName: msg });
                    });
                  }}
                />{" "}
                <h6 className="text-primary">{warningName}</h6>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>
                  Password<span className="text-primary">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onBlur={(event) => {
                    return passwordChecker(event.target.value).then(
                      ({ valid, msg }) => {
                        if (valid) {
                          formHandler(event, "formPassword");
                        }
                        setWarning({ ...warning, warningPassword: msg });
                      }
                    );
                  }}
                />
                <h6 className="text-primary">{warningPassword}</h6>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="URL"
                  onChange={(event) => {
                    return imageChecker(event.target.value)
                      .then(({ valid, msg }) => {
                        if (valid) {
                          formHandler(event, "formAvatar");
                        }
                        setWarning({ ...warning, warningAvatar: msg });
                      })
                      .catch((err) => {
                        setForm({
                          ...form,
                          formAvatar: require("../assets/user-avatar-placeholder.webp"),
                        });
                        setWarning({
                          ...warning,
                          warningAvatar:
                            "an error occured trying to load image",
                        });
                      });
                  }}
                />
                <h6 className="text-primary">{warningAvatar}</h6>
              </Form.Group>
              <Form.Group>
                <Image
                  className=" border border-primary border-4 mb-3"
                  src={formAvatar}
                  alt={formUsername}
                  roundedCircle={true}
                  width={120}
                  height={120}
                />
                <Accordion defaultActiveKey="0" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <Form.Check
                        type="checkbox"
                        id="t&c-checkbox"
                        className="me-3"
                        onChange={() => {
                          setForm({ ...form, formTandC: !formTandC });
                        }}
                      />
                      I agree to the terms and conditions
                    </Accordion.Header>
                    <Accordion.Body className="fs-6 fwt-light fst-italic">
                      <TandC />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <h6>
                  <span className="text-primary">*</span> required
                </h6>
              </Form.Group>
              <Form.Group>
                <Button
                  variant="primary"
                  disabled={!valid}
                  onClick={() => {
                    createAccount(
                      formUsername,
                      formPassword,
                      formName,
                      formAvatar
                    );
                    handleClose();
                  }}
                >
                  Create
                </Button>{" "}
              </Form.Group>{" "}
            </Form>
          </>
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
