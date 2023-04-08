import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { Container, Placeholder } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { VoteArticle } from "../utils/VoteArticle";

import { UserContext } from "../contexts/contexts";

export const ArticleCard = ({ article, isLoading }) => {
  const {
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
    VoteArticle(
      article_id,
      increment,
      username,
      permission,
      voteCounter,
      setVoteCounter,
      voteHistory,
      setVoteHistory
    );
  };

  return isLoading ? (
    <Container className="article-card rounded border border-primary mb-3 p-0">
      <img
        src={require("../assets/placeholder.png")}
        alt="placeholder"
        animation="glow"
      />

      <div className="d-flex flex-column m-2 flex-grow-1">
        <h2>
          <Placeholder animation="glow">
            <Placeholder xs={10} bg="primary" />
          </Placeholder>
        </h2>

        <p>
          <Placeholder animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </p>
        <p>
          <Placeholder animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </p>
        <p>
          <Placeholder animation="glow">
            <Placeholder xs={2} />
          </Placeholder>
        </p>

        <h3 className="d-flex align-items-end justify-content-end flex-grow-1">
          <Placeholder
            className="d-flex justify-content-end w-50"
            animation="glow"
          >
            <Placeholder xs={2} />
          </Placeholder>
        </h3>
      </div>
    </Container>
  ) : (
    <Container className="article-card rounded border border-primary mb-3 p-0">
      <Link to={`/articles/id/${article_id}`}>
        <img src={article_img_url} alt={article_id} />
      </Link>

      <div className="d-flex flex-column m-2 flex-grow-1">
        <Link to={`/articles/id/${article_id}`}>
          <h2>{title}</h2>
        </Link>

        <p>by {author}</p>
        <p>{dateFormatted}</p>
        <p>{topic}</p>
        <h3 className="d-flex align-items-end justify-content-end flex-grow-1">
          {voteCounter}
          &nbsp;
          <FontAwesomeIcon
            className="link-primary mb-1"
            onClick={() => {
              voteOnClick(+1);
            }}
            icon={icon({ name: "thumbs-up" })}
            bounce={false}
          />
          &nbsp;
          <FontAwesomeIcon
            className="link-secondary"
            onClick={() => voteOnClick(+1)}
            icon={icon({ name: "thumbs-down" })}
          />
        </h3>
      </div>
    </Container>
  );
};
