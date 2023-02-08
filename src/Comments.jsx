import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"

import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { Loading } from "./Loading"
import { ArticleCommentCards } from "./ArticleCommentCards"

import { getArticle } from "./ApiCalls"

import { LoadingContext } from "./contexts/Loading"


export const Comments = () => {
    const params = useParams()
    const { article_id } = params

    const { isLoading, setIsLoading } = useContext(LoadingContext)

    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])

    const { title, topic, body, author, created_at, votes, article_img_url, comment_count } = article
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });


    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((article) => {
                setArticle(article)
                setIsLoading(false)
            })
    }, [])

    return (
        <div>
            <Banner />

            <div id="content">
                {isLoading ? <Loading /> : null}

                <h1>{title}</h1>

                <div class="article-details">
                    <p>by {author}</p>
                    <p>{dateFormatted}</p>
                    <p>{topic}</p>
                </div>

                <h1>Comments</h1>
                <p>{comment_count}💬</p>

                {comment_count === 0 ?
                    <h2>Be the first to comment...</h2> :
                    <ArticleCommentCards article_id={article_id} comment_count={comment_count} display_count={comment_count} />
                }
            </div>

            <Footer />
        </div>
    )
}