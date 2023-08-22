import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Image, Alert } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { deleteComment, getUser } from "../utils/ApiCalls";
import { UserContext } from "../contexts/contexts";

import { Vote } from "../utils/Vote";

export const CommentCard = ({ comment, setRefresh }) => {
  const { comment_id, author, body, created_at, votes, vote_history } = comment;

  const {
    user: { username, permission },
  } = useContext(UserContext);

  const [voteCounter, setVoteCounter] = useState(votes);
  const [voteHistory, setVoteHistory] = useState(vote_history);
  const [avatar, setAvatar] = useState(
    require("../assets/image-placeholder.png")
  );
  const [alert, setAlert] = useState({ show: false });

  const { show, variant, msg } = alert;

  const date = new Date(created_at);
  const dateFormatted = date.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  useEffect(() => {
    getUser(author).then(({ avatar_url }) => {
      setAvatar(avatar_url);
    });
  }, [author]);

  const voteOnClick = (increment) => {
    Vote(
      "comment",
      comment_id,
      increment,
      permission,
      username,
      voteCounter,
      setVoteCounter,
      voteHistory,
      setVoteHistory
    );
  };

  const deleteOnClick = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setAlert({
          show: true,
          variant: "danger",
          msg: "Comment Deleted!",
        });
        setTimeout(() => {
          setRefresh(true);
        }, 1500);
      })
      .catch((err) => {
        alert("Sorry we couldn't delete your comment");
      });
  };

  return show ? (
    <Alert
      className="d-flex col-12 mb-5"
      show={show}
      key={variant}
      variant={variant}
    >
      {msg}
    </Alert>
  ) : (
    <div className="d-flex mb-5">
      <div className="d-flex flex-column col-2 align-items-center me-3">
        <Image
          className=" border border-secondary border-2 mb-2"
          src={avatar}
          alt={author}
          roundedCircle={true}
          width={45}
          height={45}
        />

        <h5 className="text-break">{author}</h5>

        <h5 className="d-flex align-items-center">
          {voteCounter}
          &nbsp;
          <Link to="">
            <FontAwesomeIcon
              className="mb-1"
              onClick={() => {
                voteOnClick(+1);
              }}
              icon={icon({ name: "thumbs-up" })}
            />
          </Link>
          &nbsp;
          <Link className="link-secondary" to="">
            <FontAwesomeIcon
              onClick={() => voteOnClick(-1)}
              icon={icon({ name: "thumbs-down" })}
            />
          </Link>
        </h5>
      </div>

      <div className="d-flex flex-column col-10 flex-shrink-1 text-start">
        <p>{body}</p>

        <br />

        <div className="d-flex flex-grow-1">
          <p className="d-flex align-items-end flex-grow-1 mb-0 text-secondary">
            <em>{dateFormatted}</em>
          </p>

          <h4 className="d-flex justify-content-end align-items-end mb-0 me-2">
            {author === username ? (
              <Link to="">
                <FontAwesomeIcon
                  onClick={() => {
                    deleteOnClick(comment_id);
                  }}
                  icon={icon({ name: "trash-can" })}
                />
              </Link>
            ) : null}
          </h4>
        </div>
      </div>
    </div>
  );
};
