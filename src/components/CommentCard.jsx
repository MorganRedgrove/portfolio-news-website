import { useState, useEffect, useContext } from "react";
import { deleteComment, getUser } from "../utils/ApiCalls";
import { UserContext } from "../contexts/contexts";

import { VoteComment } from "../utils/VoteComment";

export const CommentCard = ({ comment }) => {
  const { comment_id, author, body, created_at, votes, vote_history } = comment;

  const {
    user: { username, permission },
  } = useContext(UserContext);

  const [voteCounter, setVoteCounter] = useState(votes);
  const [voteHistory, setVoteHistory] = useState(vote_history);
  const [avatar, setAvatar] = useState(
    "https://static.vecteezy.com/system/resources/previews/000/440/213/original/question-mark-vector-icon.jpg"
  );

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

  const deleteOnClick = (comment_id) => {
    deleteComment(comment_id).then(() => {
      alert("Comment has been deleted");
      window.location.reload();
    });
  };

  return (
    <div className="comment-card">
      <div className="comment-card-user">
        <img src={avatar} alt={author} />
        <h3>{author}</h3>
        <p className="comment-card-buttons">
          {voteCounter}👍{" "}
          <button
            onClick={() => {
              VoteComment(
                comment_id,
                1,
                username,
                permission,
                voteCounter,
                setVoteCounter,
                voteHistory,
                setVoteHistory
              );
            }}
          >
            vote up
          </button>
          <button
            onClick={() => {
              VoteComment(
                comment_id,
                -1,
                username,
                permission,
                voteCounter,
                setVoteCounter,
                voteHistory,
                setVoteHistory
              );
            }}
          >
            vote down
          </button>
        </p>
      </div>

      <div className="comment-card-text">
        <p>{body}</p>
        <br />
        <p className="comment-card-timestamp">{dateFormatted}</p>
        {author === username ? (
          <button
            onClick={() => {
              deleteOnClick(comment_id);
            }}
          >
            delete
          </button>
        ) : null}
      </div>
    </div>
  );
};
