import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Container, Form } from "react-bootstrap";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Error } from "../components/Error";
import { ArticleCard } from "../components/ArticleCard";

import { getArticles, getTopics } from "../utils/ApiCalls";

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
  const [isValidTopic, setIsValidTopic] = useState(true);

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
      })
      .then(() => {
        getTopics().then((topics) => {
          if (topic) {
            setIsValidTopic(
              topics.some(({ slug }) => {
                return slug === topic;
              })
            );
          }
          setIsLoading(false);
        });
      })
      .catch((err) => {
        setError(err.response.statusText);
      });
  }, [topic, sort_by, order]);

  if (error) {
    return <Error msg={error} />;
  } else if (!isValidTopic) {
    return <Error msg="Not Found" />;
  }

  return (
    <body>
      <Banner />

      <Container className="content">
        <div className="d-flex flex-column align-items-center justify-content-end flex-md-row mb-3">
          <h1 className="content-header mb-3">Articles</h1>

          <div className="d-flex justify-content-center col-12 position-relative flex-md-column col-md-3">
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

        {articles.map((article) => {
          return (
            <ArticleCard
              article={article}
              isLoading={isLoading}
              key={article?.article_id}
            />
          );
        })}
      </Container>

      <Footer></Footer>
    </body>
  );
};
