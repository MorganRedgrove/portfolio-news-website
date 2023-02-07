import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticle } from "./ApiCalls"
import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { Loading } from "./Loading"

export const Article = ({ isLoading, setIsLoading }) => {
    const params = useParams()
    const { article_id } = params

    const [article, setArticle] = useState({})

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

                <div class="article-body">
                    <img src={article_img_url} alt="title" />
                    <p>{body}</p>
                </div>

                <div class="article-buttons">
                    <p>{votes}👍 <button>vote</button> {comment_count}💬 <button>comments</button></p>
                </div>

            </div>




            <Footer />
        </div>

    )
}