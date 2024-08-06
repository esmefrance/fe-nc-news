import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-xyud.onrender.com/api",
});

function getArticles() {
  return api.get("/articles").then((response) => {
    return response.data.articles;
  });
}

function getArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getCommentsByArticleId(article_id) {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateArticleById(article_id, vote) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: vote })
    .then((response) => {
      return response.data.article
    })
    .catch((err) => {
      return err
    });
}

export { getArticles, getArticleById, getCommentsByArticleId, updateArticleById };
