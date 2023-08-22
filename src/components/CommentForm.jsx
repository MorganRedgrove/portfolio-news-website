import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Alert } from "react-bootstrap";

import { OffCanvasContext, UserContext } from "../contexts/contexts";

import { postComment } from "../utils/ApiCalls";

export const CommentForm = ({
  article_id,
  setRefresh,
  setComments,
  comments,
}) => {
  const {
    user: { username, permission },
  } = useContext(UserContext);

  const { setOffCanvas } = useContext(OffCanvasContext);

  const [body, setBody] = useState("");
  const [alert, setAlert] = useState({ show: false });

  const { show, variant, msg } = alert;

  const comment = { username, body };

  const charLimit = 300;

  const changeHandler = (event) => {
    setBody(event.target.value);
  };

  onsubmit = (event) => {
    event.preventDefault();
    postComment(article_id, comment)
      .then(() => {
        event.target.reset();
        setBody("");
        setAlert({ show: true, variant: "success", msg: "Comment posted!" });
        setRefresh(Date.now());
      })
      .catch((err) => {
        setAlert({
          show: true,
          variant: "danger",
          msg: "Sorry we couldn't post your comment",
        });
      });
  };

  return (
    <div className="d-flex flex-column align-items-center col-12 mb-5">
      {username === "guest" ? (
        <h3>
          You must be logged in to comment on this article <br />{" "}
          <Link
            to=""
            onClick={() => {
              setOffCanvas({ show: true, content: "login" });
            }}
          >
            Login
          </Link>
        </h3>
      ) : null}

      <Form className="d-flex flex-column align-items-center col-8">
        <Alert
          className="d-flex col-12 mb-1"
          show={show}
          key={variant}
          variant={variant}
          delay={3000}
          autohide
          dismissible
          onClose={() => setAlert({ show: false })}
        >
          {msg}
        </Alert>

        <Form.Group rows={5} className="col-12 mb-1">
          <Form.Control
            as="textarea"
            maxLength={300}
            rows={5}
            disabled={!permission}
            onChange={changeHandler}
          />
        </Form.Group>

        <p className="text-secondary">{`(${
          charLimit - body?.length
        }/${charLimit} characters remaining)`}</p>

        <div>
          <Button variant="primary" type="submit" disabled={!permission}>
            Submit
          </Button>{" "}
          <Button variant="primary" type="Reset" disabled={!permission}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};
