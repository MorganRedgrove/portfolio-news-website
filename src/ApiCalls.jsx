import axios from "axios"

const apiCaller = axios.create({
    baseURL: "https://nc-news-xe9m.onrender.com/api",
})

export const getArticles = (topic) => {
    let endpoint = "/articles"

    if (topic) {
        endpoint += `?topic=${topic}`
    }

    return apiCaller.get(endpoint)
        .then((response) => {
            return response.data.articles
        })
}

export const getArticle = (article_id) => {
    return apiCaller.get(`/articles/${article_id}`)
        .then((response) => {
            return response.data.article
        })
}

export const getComments = (article_id) => {
    return apiCaller.get(`/articles/${article_id}/comments`)
        .then((response) => {
            return response.data.comments
        })
}

export const getUser = (username) => {
    return apiCaller.get(`/users/${username}`)
        .then((response) => {
            return response.data.user
        })
}

export const patchArticle = (article_id, inc_votes) => {
    const body = { inc_votes }

    return apiCaller.patch(`/articles/${article_id}`, body)
        .then((response) => {
            return response.data.article
        })
}

export const getTopics = () => {
    return apiCaller.get("/topics")
        .then((response) => {
            return response.data.topics
        })
}
