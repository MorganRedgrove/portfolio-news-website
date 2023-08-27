import { Image, Form, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import { TandC } from "../TandC ";

import { imageChecker } from "../../utils/imageChecker";
import { usernameChecker } from "../../utils/usernameChecker";
import { nameChecker } from "../../utils/nameChecker";
import { passwordChecker } from "../../utils/passwordChecker";

export const OffCanvasCreateAccount = ({
  createAccount,
  form,
  setForm,
  warning,
  setWarning,
  formHandler,
  closeHandler,
}) => {
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

  return (
    <>
      <p>Lets make an account!</p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>
            Username<span className="text-primary">*</span>
          </Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            onBlur={(event) => {
              usernameChecker(event.target.value).then(({ valid, msg }) => {
                if (valid) {
                  formHandler(event, "formUsername");
                }
                setWarning({ ...warning, warningUsername: msg });
              });
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
                    formAvatar: require("../../assets/user-avatar-placeholder.webp"),
                  });
                  setWarning({
                    ...warning,
                    warningAvatar: "an error occured trying to load image",
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
              createAccount(formUsername, formPassword, formName, formAvatar);
              closeHandler();
            }}
          >
            Create
          </Button>{" "}
        </Form.Group>{" "}
      </Form>
    </>
  );
};
