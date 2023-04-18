import { Link } from "react-router-dom";

import { Placeholder } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const ArticleCardPlaceholder = () => {
  return (
    <div className="d-flex flex-column flex-md-row rounded border border-primary overflow-hidden text-start mb-3 p-0">
      <img
        className="article-card-img"
        src={require("../assets/image-placeholder.png")}
        alt="placeholder"
      />

      <div className="d-flex flex-column m-2 flex-grow-1">
        <h2>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={10} bg="primary" />
          </Placeholder>
        </h2>

        <p>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={3} />
          </Placeholder>
        </p>
        <p>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={3} />
          </Placeholder>
        </p>
        <p>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={2} bg="primary" />
          </Placeholder>
        </p>

        <h3 className="d-flex align-items-end justify-content-end flex-grow-1">
          <Placeholder
            className="d-flex justify-content-end col-6 rounded-2"
            animation="glow"
          >
            <Placeholder className="rounded-2" xs={1} />
          </Placeholder>
          &nbsp;
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
        </h3>
      </div>
    </div>
  );
};
