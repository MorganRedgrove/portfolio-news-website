import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

import { CommentCard } from "./CommentCard";
import { CommentForm } from "./CommentForm";

import { getComments } from "../utils/ApiCalls";

import { CommentCardPlaceholder } from "../placeholders/CommentCardPlaceholder";

export const CommentsSection = ({ article_id, display_count = 0 }) => {
  const [comments, setComments] = useState([{}, {}, {}, {}, {}]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(Date.now());

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);

  useEffect(() => {
    getComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id, refresh]);

  const navigate = useNavigate();

  return (
    <div className="mb-5">
      <CommentForm
        article_id={article_id}
        setRefresh={setRefresh}
        setComments={setComments}
        comments={comments}
      />

      {comments.length === 0 ? (
        <h2>Be the first to comment...</h2>
      ) : (
        comments.map((comment, index) => {
          return index <= display_count - 1 ? (
            isLoading ? (
              <CommentCardPlaceholder key={`placeholder-${index + 1}`} />
            ) : (
              <CommentCard
                comment={comment}
                key={comment.comment_id}
                setRefresh={setRefresh}
              />
            )
          ) : null;
        })
      )}

      {comments.length - display_count > 0 ? (
        <Button
          onClick={() => {
            navigate("./comments");
          }}
        >
          read {comments.length - display_count} more comments
        </Button>
      ) : null}
    </div>
  );
};
