import axios from "axios";

const apiCaller = axios.create({
  baseURL: "https://nc-news-xe9m.onrender.com/api",
});

export const getArticles = ({ topic, sort_by, order }) => {
  let endpoint = "/articles";
  const queryArr = [];

  if (topic || sort_by || order) {
    endpoint += "?";
    if (topic) {
      queryArr.push(`topic=${topic}`);
    }

    if (sort_by) {
      queryArr.push(`sort_by=${sort_by}`);
    }

    if (order) {
      queryArr.push(`order=${order}`);
    }

    endpoint += queryArr.join("&");
  }

  return apiCaller.get(endpoint).then((response) => {
    return response.data.articles;
  });
};

export const getArticle = (article_id) => {
  return apiCaller.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getComments = (article_id) => {
  return apiCaller.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const getUser = (username) => {
  return apiCaller.get(`/users/${username}`).then((response) => {
    return response.data.user;
  });
};

export const patchArticle = (article_id, inc_votes, username) => {
  const body = { inc_votes, username };

  return apiCaller.patch(`/articles/${article_id}`, body).then((response) => {
    return response.data.article;
  });
};

export const getTopics = () => {
  return apiCaller.get("/topics").then((response) => {
    return response.data.topics;
  });
};

export const postComment = (article_id, body) => {
  return apiCaller.post(`/articles/${article_id}/comments`, body);
};

export const getUsers = () => {
  return apiCaller.get("/users").then((response) => {
    return response.data.users;
  });
};

export const deleteComment = (comment_id) => {
  return apiCaller.delete(`/comments/${comment_id}`);
};

export const patchComment = (comment_id, inc_votes, username) => {
  const body = { inc_votes, username };

  return apiCaller.patch(`/comments/${comment_id}`, body).then((response) => {
    return response.data.comment;
  });
};

export const patchLogin = (username, password) => {
  const body = { username, password };

  return apiCaller.patch(`/login`, body).then((response) => {
    return response.data.match;
  });
};

export const postUser = (username, password, name, avatar_url) => {
  const body = { password, name, avatar_url };

  return apiCaller.post(`/users/${username}`, body).then((response) => {
    return response.data.user;
  });
};
