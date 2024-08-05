import axios from "axios";

const api = axios.create({
    baseURL: 'https://nc-news-xyud.onrender.com/api',
})

function getArticles(){
    return api.get('/articles').then((response)=>{
        return response.data.articles
    })
}

export {getArticles}
