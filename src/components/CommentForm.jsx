import { useState, useContext } from "react";
import { UserContext } from "../contexts/contexts";
import { postComment } from "../utils/ApiCalls";
import { Link } from "react-router-dom";

export const CommentForm = ({ article_id }) => {
  const {
    user: { username, permission },
  } = useContext(UserContext);

  const [body, setBody] = useState({});

  const comment = { username, body };

  const changeHandler = (event) => {
    setBody(event.target.value);
  };

  onsubmit = (event) => {
    event.preventDefault();
    postComment(article_id, comment)
      .then(() => {
        alert("Comment posted!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Sorry we couldn't post your comment");
      });
  };

  return (
    <div className="comment-form">
      <div className="comment-form-login">
        {username === "guest" ? (
          <div>
            <h3>You must be logged in to comment on this article</h3>
            <Link to="/login">Login</Link>
          </div>
        ) : null}
      </div>

      <div>
        <form className="form">
          <textarea
            className="comment-form-textarea"
            onChange={changeHandler}
            disabled={!permission}
            rows="5"
            cols="75"
          ></textarea>
          <div>
            <button type="reset" disabled={!permission}>
              reset
            </button>
            <button type="submit" disabled={!permission}>
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
