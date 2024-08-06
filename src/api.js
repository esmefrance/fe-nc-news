import axios from "axios";

const api = axios.create({
    baseURL: 'https://nc-news-xyud.onrender.com/api',
})

function getArticles(){
    return api.get('/articles').then((response)=>{
        return response.data.articles
    })
}

function getArticleById(article_id){
    return api.get(`/articles/${article_id}`).then((response)=>{
        return response.data.article
    }).catch((err) => {
        console.log(err)
    })
}

export {getArticles, getArticleById}
