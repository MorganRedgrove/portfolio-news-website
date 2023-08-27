import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Image } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { OffCanvasContext, UserContext } from "../contexts/contexts";

import { getUser, patchLogin, postUser } from "../utils/ApiCalls";
import { OffCanvasMenu } from "./off canvas/OffCanvasMenu";
import { OffCanvasLogin } from "./off canvas/OffCanvasLogin";
import { OffCanvasProfile } from "./off canvas/OffCanvasProfile";
import { OffCanvasCreateAccount } from "./off canvas/OffCanvasCreateAccount";

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

  const login = (username, password) => {
    patchLogin(username, password)
      .then((match) => {
        if (match) {
          getUser(username).then((user) => {
            setUser(user);
            closeHandler();
          });
        } else {
          setError("Username or password incorrect");
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

  const closeHandler = () => {
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
    setError(null);
    setOffCanvas({ show: false, content: null });
  };

  return (
    <Offcanvas show={show} onHide={closeHandler} placement="end">
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

              closeHandler();
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
          <OffCanvasMenu
            setOffCanvas={setOffCanvas}
            closeHandler={closeHandler}
          />
        ) : null}

        {content === "login" ? (
          <OffCanvasLogin
            setOffCanvas={setOffCanvas}
            login={login}
            form={form}
            error={error}
            formHandler={formHandler}
          />
        ) : null}

        {content === "user" ? <OffCanvasProfile /> : null}

        {content === "create-account" ? (
          <OffCanvasCreateAccount
            createAccount={createAccount}
            form={form}
            setForm={setForm}
            warning={warning}
            setWarning={setWarning}
            formHandler={formHandler}
            closeHandler={closeHandler}
          />
        ) : null}
      </Offcanvas.Body>
    </Offcanvas>
  );
};
