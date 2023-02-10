import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { ArticleCard } from "./ArticleCard"
import { Loading } from "./Loading"

import { getArticles } from "./ApiCalls"

import { LoadingContext } from "./contexts/contexts"


export const Articles = () => {
    const params = useParams()
    const { topic } = params

    const { isLoading, setIsLoading } = useContext(LoadingContext)

    useEffect(() => {
        setIsLoading(true)
        getArticles(topic)
            .then((articles) => {
                setArticles(articles)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        getArticles(topic)
            .then((articles) => {
                setArticles(articles)
            })
    }, [topic])

    const [articles, setArticles] = useState([])
    const [sort_by, setSortBy] = useState("")
    const [order, setOrder] = useState("")

    const articleKeys = ["title", "topic", "author", "created_at"]

    const changeHandler = (event, setFunc) => {
        setFunc(event.target.value)
    }

    useEffect(() => {
        setIsLoading(true)
        getArticles(sort_by, order)
            .then((articles) => {
                setArticles(articles)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        getArticles(sort_by, order)
            .then((articles) => {
                setArticles(articles)
            })
    }, [sort_by, order])

    return (
        <div>
            <Banner></Banner>

            <div id="content">
                <h1>Articles</h1>

                <div className="articles-dropdown">
                    <label htmlFor="articles-sort">Sort by:</label>
                    <select id="articles-sort" onChange={(event) => { changeHandler(event, setSortBy) }}>
                        <option value="">Select</option>
                        {articleKeys.map((key) => {
                            return (
                                <option key={key} value={key}>{key}</option>
                            )
                        })}
                    </select>

                    <label htmlFor="articles-order">Order:</label>
                    <select id="articles-order" onChange={(event) => { changeHandler(event, setOrder) }}>
                        <option value="DESC">Descending</option>
                        <option value="ASC">Ascending</option>

                    </select>
                </div>

                {isLoading ? <Loading /> : null}

                {articles.map((article) => {
                    return (
                        <ArticleCard article={article} key={article.article_id} />
                    )
                })}
            </div>

            <Footer></Footer>
        </div>
    )
}