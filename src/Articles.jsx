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
    const [articles, setArticles] = useState([])

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

    return (
        <div>
            <Banner></Banner>

            <div id="content">
                <h1>Articles</h1>

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