import axios from "axios";

const api = axios.create({
  baseURL: "https://nc-news-xyud.onrender.com/api",
});

function getArticles(params = {}) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => value)
  );

  const query = new URLSearchParams(filteredParams).toString();
  const endpoint = query ? `/articles?${query}` : '/articles';

  return api.get(endpoint)
    .then((response) => response.data.articles);
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
    })  .catch((error) => {
        throw error
    })
}

function postComment(article_id, comment){
  return api.post(`/articles/${article_id}/comments`, comment).then((response) => {
    return response.data.comment
  })  .catch((error) => {
      throw error
  })
}

function getUserByUsername(username){
  return api
    .get(`/users/${username}`)
    .then((response) => {
      return response.data.user;
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteCommentById(comment_id){
  return api.delete(`/comments/${comment_id}`).then((response) => {
    return response
  })
  .catch((err) => {
    console.log(err);
  });
}

function getTopics(){
  return api.get('/topics').then((response) => {
    return response.data.topics
  })
  .catch((err) => {
    console.log(err);
  });
}

function getAuthors(){
  return api
    .get("/users")
    .then((response) => {
      return response.data.users;
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getArticles, getArticleById, getCommentsByArticleId, updateArticleById, postComment, getUserByUsername, deleteCommentById, getTopics, getAuthors };
