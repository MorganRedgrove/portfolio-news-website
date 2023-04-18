import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Container, Placeholder } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Error } from "../components/Error";
import { CommentsSection } from "../components/CommentsSection";

import { getArticle } from "../utils/ApiCalls";

export const Comments = () => {
  const params = useParams();
  const { article_id } = params;

  const [article, setArticle] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { title, comment_count } = article;

  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError({ code: err.response.status, msg: err.response.statusText });
      });
  }, [article_id]);

  if (error) {
    return <Error code={error.code} msg={error.msg} />;
  }

  return (
    <>
      <Banner />

      <Container className="content">
        <>
          {isLoading ? (
            <>
              <h1 className="mb-2">
                <Placeholder animation="glow">
                  <Placeholder className="rounded-2" xs={10} />
                </Placeholder>
              </h1>

              <h2 className="mb-2">
                <Placeholder animation="glow">
                  <Placeholder className="rounded-2" xs={1} />
                </Placeholder>
                &nbsp;
                <FontAwesomeIcon
                  className="text-primary mb-1"
                  icon={icon({ name: "comments" })}
                />
              </h2>
            </>
          ) : (
            <>
              <h1 className="mb-2">{title}</h1>

              <h2 className="mb-2">
                {comment_count}
                &nbsp;
                <FontAwesomeIcon
                  className="text-primary mb-1"
                  icon={icon({ name: "comments" })}
                />
              </h2>
            </>
          )}

          <CommentsSection
            article_id={article_id}
            comment_count={comment_count}
            display_count={comment_count}
          />
        </>
      </Container>

      <Footer />
    </>
  );
};
