import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { ArticleComments } from "../components/ArticleComments";

import { getArticle } from "../utils/ApiCalls";

export const Comments = () => {
  const params = useParams();
  const { article_id } = params;

  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { title, topic, author, created_at, comment_count } = article;
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
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <h1>{title}</h1>

            <div className="article-details">
              <p>by {author}</p>
              <p>{dateFormatted}</p>
              <p>{topic}</p>
            </div>

            <h1>Comments</h1>
            <p>{comment_count}💬</p>

            {comment_count === 0 ? (
              <h2>Be the first to comment...</h2>
            ) : (
              <ArticleComments
                article_id={article_id}
                comment_count={comment_count}
                display_count={comment_count}
              />
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
