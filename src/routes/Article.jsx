import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { ArticleComments } from "../components/ArticleComments";
import { CommentForm } from "../components/CommentForm";

import { getArticle } from "../utils/ApiCalls";
import { VoteArticle } from "../utils/VoteArticle.jsx";

import { UserContext } from "../contexts/contexts";

export const Article = () => {
  const params = useParams();
  const { article_id } = params;

  const {
    user: { username, permission },
  } = useContext(UserContext);

  const [article, setArticle] = useState({});
  const [voteCounter, setVoteCounter] = useState();
  const [voteHistory, setVoteHistory] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    title,
    topic,
    body,
    author,
    created_at,
    article_img_url,
    comment_count,
  } = article;
  const date = new Date(created_at);
  const dateFormatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setVoteCounter(article.votes);
        setVoteHistory(article.vote_history);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.statusText);
      });
  }, [article_id]);

  if (error) {
    return <Error msg={error} />;
  }

  return (
    <div>
      <Banner />

      <div id="content">
        {isLoading ? <Loading /> : null}

        <div class="article">
          <h1 style={{ fontSize: 52 }}>{title}</h1>

          <div className="article-details">
            <p>by {author}</p>
            <p>{dateFormatted}</p>
            <p>{topic}</p>
          </div>

          <div className="article-body">
            <img src={article_img_url} alt="title" />
            <p>{body}</p>
          </div>

          <div className="article-buttons">
            <p>
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
              </button>
            </p>
          </div>
        </div>

        <div class="article">
          <h1>Comments</h1>
          <p>{comment_count}💬</p>

          <CommentForm article_id={article_id} />
        </div>

        {comment_count === 0 ? (
          <h2>Be the first to comment...</h2>
        ) : (
          <ArticleComments
            article_id={article_id}
            comment_count={comment_count}
            display_count={5}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};
