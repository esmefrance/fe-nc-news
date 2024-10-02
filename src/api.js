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
    .then((response) => response.data.articles).catch((error) => {
      throw error
    })
}



function getArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      throw error
    });
}

function getCommentsByArticleId(article_id) {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      throw error
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
    .catch((error) => {
      throw error
    });
}

function deleteCommentById(comment_id){
  return api.delete(`/comments/${comment_id}`).then((response) => {
    return response
  })
  .catch((error) => {
    throw error
  });
}

function getTopics(){
  return api.get('/topics').then((response) => {
    return response.data.topics
  })
  .catch((error) => {
    throw error
  });
}

function getAuthors(){
  return api
    .get("/users")
    .then((response) => {
      return response.data.users;
    })
    .catch((error) => {
      throw error
    });
}

function postArticle(article){
  return api 
  .post("articles", article )
  .then((response) => {
    return response.data.article;
  })
  .catch((error) => {
    throw error
  });
}



export { getArticles, getArticleById, getCommentsByArticleId, updateArticleById, postComment, getUserByUsername, deleteCommentById, getTopics, getAuthors, postArticle };
