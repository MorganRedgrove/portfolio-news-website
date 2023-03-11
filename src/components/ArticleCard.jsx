import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { VoteArticle } from "../utils/VoteArticle";

import { UserContext } from "../contexts/contexts";

export const ArticleCard = ({ article }) => {
  const {
    article_id,
    title,
    topic,
    author,
    created_at,
    article_img_url,
    comment_count,
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

  const navigate = useNavigate();

  return (
    <div className="article-card">
      <div className="article-card-img">
        <Link to={`/articles/id/${article_id}`}>
          <img src={article_img_url} alt={title} />
        </Link>
      </div>

      <div className="article-card-text">
        <Link to={`/articles/id/${article_id}`}>
          <h1>{title}</h1>
        </Link>

        <p>by {author}</p>
        <p>{dateFormatted}</p>
        <p>{topic}</p>
        <p className="article-card-buttons">
          {voteCounter}👍{" "}
          <button
            onClick={() =>
              VoteArticle(
                article_id,
                1,
                username,
                permission,
                voteCounter,
                setVoteCounter,
                voteHistory,
                setVoteHistory
              )
            }
          >
            vote up
          </button>
          <button
            onClick={() =>
              VoteArticle(
                article_id,
                -1,
                username,
                permission,
                voteCounter,
                setVoteCounter,
                voteHistory,
                setVoteHistory
              )
            }
          >
            vote down
          </button>{" "}
          {comment_count}💬{" "}
          <button
            onClick={() => {
              navigate(`../articles/id/${article_id}/comments`);
            }}
          >
            comments
          </button>
        </p>
      </div>
    </div>
  );
};
