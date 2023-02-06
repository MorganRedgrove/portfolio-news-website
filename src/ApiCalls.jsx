import axios from "axios"

const apiCaller = axios.create({
    baseURL: "https://nc-news-xe9m.onrender.com/api",
})

export const getArticles = () => {
    return apiCaller.get("/articles")
        .then((response) => {
            return response.data.articles
        })
}