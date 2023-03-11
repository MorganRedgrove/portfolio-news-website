import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";
import { ArticleCard } from "../components/ArticleCard";

import { getArticles, getTopics } from "../utils/ApiCalls";

export const Articles = () => {
  const params = useParams();
  const { topic } = params;

  const [articles, setArticles] = useState([]);
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
  }, [topic, sort_by, order, setIsLoading]);

  if (error) {
    return <Error msg={error} />;
  } else if (!isValidTopic) {
    return <Error msg="Not Found" />;
  }

  return (
    <div>
      <Banner></Banner>

      <div id="content">
        <h1 style={{ fontSize: 52 }}>Articles</h1>

        <div className="articles-dropdown">
          <label htmlFor="articles-sort">Sort by:</label>
          <select
            id="articles-sort"
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
          </select>

          <label htmlFor="articles-order">Order:</label>
          <select
            id="articles-order"
            onChange={(event) => {
              changeHandler(event, setOrder);
            }}
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          articles.map((article) => {
            return <ArticleCard article={article} key={article.article_id} />;
          })
        )}
      </div>

      <Footer></Footer>
    </div>
  );
};
