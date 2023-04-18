import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Container, Form } from "react-bootstrap";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Error } from "../components/Error";
import { ArticleCard } from "../components/ArticleCard";

import { getArticles } from "../utils/ApiCalls";
import { ArticleCardPlaceholder } from "../placeholders/ArticleCardPlaceholder";

export const Articles = () => {
  const params = useParams();
  const { topic } = params;

  const [articles, setArticles] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [sort_by, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const articleKeys = [
    { key: "Title", value: "title" },
    { key: "Topic", value: "topic" },
    { key: "Author", value: "author" },
    { key: "Date", value: "created_at" },
  ];

  const changeHandler = (event, setFunc) => {
    setFunc(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    getArticles({ topic, sort_by, order })
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError({ code: err.response.status, msg: err.response.statusText });
      });
  }, [topic, sort_by, order]);

  if (error) {
    return <Error code={error.code} msg={error.msg} />;
  }

  return (
    <>
      <Banner />

      <Container className="content">
        <div className="d-flex flex-column justify-content-end flex-md-row mb-3">
          <div className="content-header mb-3">
            <h1 className="mb-0">Articles</h1>
            {topic ? (
              <p>
                <em>
                  on <span className="text-primary">{topic}</span>
                </em>
              </p>
            ) : null}
          </div>

          <div className="d-flex justify-content-center col-12 flex-md-column col-md-3 position-relative">
            <div className="d-flex align-items-center mb-1">
              <label className="w-50 text-end me-2">Sort By:</label>
              <Form.Select
                className="w-50"
                onChange={(event) => {
                  changeHandler(event, setSortBy);
                }}
              >
                <option value="">Select</option>
                {articleKeys.map(({ key, value }) => {
                  return (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  );
                })}
              </Form.Select>
            </div>

            <div className="d-flex align-items-center">
              <label className="w-50 align-items-center text-end me-2">
                Order:
              </label>
              <Form.Select
                className="w-50"
                onChange={(event) => {
                  changeHandler(event, setOrder);
                }}
              >
                <option value="DESC">Descending</option>
                <option value="ASC">Ascending</option>
              </Form.Select>
            </div>
          </div>
        </div>

        {articles.map((article, index) => {
          return isLoading ? (
            <ArticleCardPlaceholder key={`placeholder-${index + 1}`} />
          ) : (
            <ArticleCard article={article} key={article.article_id} />
          );
        })}
      </Container>

      <Footer></Footer>
    </>
  );
};
