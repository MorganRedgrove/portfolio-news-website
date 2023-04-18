import { Image, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

export const CommentCardPlaceholder = () => {
  return (
    <div className="d-flex mb-3">
      <div className="d-flex flex-column col-2 align-items-center me-3">
        <Image
          className="mb-2"
          src={require("../assets/image-placeholder.png")}
          alt="placeholder"
          roundedCircle={true}
          width={45}
          height={45}
        />

        <h5 className="d-flex col-12">
          <Placeholder
            className="d-flex col-12 justify-content-center"
            animation="glow"
          >
            <Placeholder className="rounded-2" xs={11} />
          </Placeholder>
        </h5>

        <h4 className="d-flex col-12">
          <Placeholder
            className="d-flex col-12 align-items-center justify-content-center"
            animation="glow"
          >
            <Placeholder className="rounded-2" xs={2} /> &nbsp;
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
        </h4>
      </div>

      <div className="d-flex flex-column col-10 flex-shrink-1 text-start">
        <p>
          <Placeholder animation="glow">
            <Placeholder className="rounded-2" xs={12} />
            <Placeholder className="rounded-2" xs={12} />
            <Placeholder className="rounded-2" xs={12} />
          </Placeholder>
        </p>

        <p className="d-flex align-items-end flex-grow-1">
          <Placeholder className="d-flex col-12 rounded-2" animation="glow">
            <Placeholder className="rounded-2" xs={5} />
          </Placeholder>
        </p>
      </div>
    </div>
  );
};
