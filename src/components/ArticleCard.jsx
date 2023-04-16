import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Vote } from "../utils/Vote";

import { UserContext } from "../contexts/contexts";

export const ArticleCard = ({ article }) => {
  let {
    article_id,
    title,
    topic,
    author,
    created_at,
    article_img_url,
    votes,
    vote_history,
  } = article;

  const {
    user: { username, permission },
  } = useContext(UserContext);

  const [voteCounter, setVoteCounter] = useState(votes);
  const [voteHistory, setVoteHistory] = useState(vote_history);

  const date = new Date(created_at);
  const dateFormatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const voteOnClick = (increment) => {
    Vote(
      "article",
      article_id,
      increment,
      permission,
      username,
      voteCounter,
      setVoteCounter,
      voteHistory,
      setVoteHistory
    );
  };

  return (
    <div className="d-flex flex-column flex-md-row rounded border border-primary overflow-hidden text-start mb-3 p-0">
      <Link to={`/articles/id/${article_id}`}>
        <img
          className="article-card-img"
          src={article_img_url}
          alt={article_id}
        />
      </Link>

      <div className="d-flex flex-column m-2 flex-grow-1">
        <h2>
          <Link to={`/articles/id/${article_id}`}>{title}</Link>
        </h2>

        <p className="fst-italic">
          by {author} <br />
          {dateFormatted} <br />
          <Link to={`../articles/${topic}`}>{topic}</Link>
        </p>

        <h3 className="d-flex align-items-end justify-content-end flex-grow-1">
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
        </h3>
      </div>
    </div>
  );
};
