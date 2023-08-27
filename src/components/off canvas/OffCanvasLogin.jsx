import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

export const OffCanvasLogin = ({
  setOffCanvas,
  login,
  form,
  error,
  formHandler,
}) => {
  const { formUsername, formPassword } = form;

  return (
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
  );
};
