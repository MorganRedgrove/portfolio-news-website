import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import { Container } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Error } from "../components/Error";

import { getArticle } from "../utils/ApiCalls";
import { Vote } from "../utils/Vote";

import { UserContext } from "../contexts/contexts";
import { ArticlePlaceholder } from "../placeholders/ArticlePlaceholder";
import { CommentsSection } from "../components/CommentsSection";

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
        console.log(err);
        setError({ code: err.response.status, msg: err.response.statusText });
      });
  }, [article_id]);

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

  if (error) {
    return <Error code={error.code} msg={error.msg} />;
  }

  return (
    <>
      <Banner />

      <Container className="content">
        {isLoading ? (
          <ArticlePlaceholder />
        ) : (
          <>
            <div className="text-start">
              <h1>{title}</h1>
              <p>
                by {author}
                <span className="text-secondary"> | </span>
                {dateFormatted}
                <span className="text-secondary"> | </span>
                <Link to={`../articles/${topic}`}>{topic}</Link>
              </p>
            </div>

            <div className="text-start mb-3">
              <img
                className="article-img mb-2"
                src={article_img_url}
                alt={title}
              />

              <p>{body}</p>

              <h2 className="d-flex align-items-center justify-content-center">
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
              </h2>
            </div>

            <hr></hr>

            <div className="d-flex flex-column align-items-center justify-content-center mb-2">
              <h1>Comments</h1>
              <h2>
                {comment_count}
                &nbsp;
                <FontAwesomeIcon
                  className="text-primary mb-1"
                  icon={icon({ name: "comments" })}
                />
              </h2>
            </div>

            <CommentsSection
              article_id={article_id}
              comment_count={comment_count}
              display_count={5}
            />
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};
