import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getArticle, getComments } from "./ApiCalls"
import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { Loading } from "./Loading"
import { CommentCard } from "./CommentCard"

export const Article = ({ isLoading, setIsLoading }) => {
    const params = useParams()
    const { article_id } = params

    const [article, setArticle] = useState({})
    const [comments, setComments] = useState([])

    const { title, topic, body, author, created_at, votes, article_img_url, comment_count } = article
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((article) => {
                setArticle(article)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
            .then((comments) => {
                setComments(comments)
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
                    <p>{votes}👍 <button>vote</button></p>
                </div>

                <h1>Comments</h1>
                <p>{comment_count}💬</p>

                <div>
                    {comments.map((comment, index) => {
                        if (index <= 4) {
                            return (
                                <CommentCard comment={comment} key={comment.comment_id} />
                            )
                        }

                    })}
                </div>

                <div>
                    {(comment_count - 5 > 0) ?
                        <button onClick={() => { navigate("./comments") }}>read {comment_count - 5} more comments</button> :
                        null
                    }
                </div>

            </div>




            <Footer />
        </div>

    )
}