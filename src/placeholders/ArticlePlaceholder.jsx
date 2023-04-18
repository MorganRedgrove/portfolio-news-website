import { Link } from "react-router-dom";

import { Placeholder } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const ArticlePlaceholder = () => {
  return (
    <>
      <div className="d-flex flex-column text-start  ">
        <h1>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={10} />
          </Placeholder>
        </h1>
        <p>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={2} />
          </Placeholder>
          <span className="text-secondary"> | </span>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={2} />
          </Placeholder>
          <span className="text-secondary"> | </span>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={2} bg="primary" />
          </Placeholder>
        </p>
      </div>

      <div className="d-flex flex-column  text-start mb-3">
        <img
          className="article-img mb-2"
          src={require("../assets/image-placeholder.png")}
          alt="placeholder"
        />

        <p>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={12} />
            <Placeholder className="rounded-2" xs={12} />
            <Placeholder className="rounded-2" xs={12} />
            <Placeholder className="rounded-2" xs={12} />
            <Placeholder className="rounded-2" xs={12} />
          </Placeholder>
        </p>

        <h2 className="d-flex align-items-center justify-content-center flex-grow-1">
          <Placeholder
            className="d-flex justify-content-center col-6 rounded-2"
            animation="glow"
          >
            <Placeholder className="rounded-2" xs={1} /> &nbsp;
            <Link to="">
              <FontAwesomeIcon
                className="mb-1"
                icon={icon({ name: "thumbs-up" })}
              />
            </Link>
            &nbsp;
            <Link className="link-secondary" to="">
              <FontAwesomeIcon icon={icon({ name: "thumbs-down" })} />
            </Link>
          </Placeholder>
        </h2>
      </div>
    </>
  );
};
