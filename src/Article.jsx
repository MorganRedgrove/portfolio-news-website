import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"

import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { Loading } from "./Loading"
import { ArticleCommentCards } from "./ArticleCommentCards"
import { CommentForm } from "./CommentForm"

import { getArticle, patchArticle } from "./ApiCalls"

import { LoadingContext, UserContext, VotingContext } from "./contexts/contexts"


export const Article = () => {
    const params = useParams()
    const { article_id } = params

    const { isLoading, setIsLoading } = useContext(LoadingContext)
    const { user: { username } } = useContext(UserContext)
    const { voteHistory, setVoteHistory } = useContext(VotingContext)

    const [article, setArticle] = useState({})
    const [voteCounter, setVoteCounter] = useState()

    const { title, topic, body, author, created_at, article_img_url, comment_count } = article
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
            .then((article) => {
                setArticle(article)
                setVoteCounter(article.votes)
                setIsLoading(false)
            })
            .catch((err) => {
                const status = err.response.status
                if (status === 404) {
                    navigate("/not-found")
                }
            })
    }, [])

    const navigate = useNavigate()

    const clickHandler = () => {
        console.log(username)
        console.log(voteHistory)
        if (voteHistory?.[username]?.[article_id]) {
            alert(`Sorry ${username}, you have already voted on this article`)
        } else {
            setVoteCounter(voteCounter + 1)
            alert("Thank you for voting!")
            patchArticle(article_id, 1)
                .then(() => {
                    voteHistory[username] = { [article_id]: true }
                    setVoteHistory(voteHistory)
                })
                .catch((err) => {
                    console.log(err)
                    setVoteCounter(voteCounter)
                    alert("Sorry we couldn't process your vote")
                })
        }
    }

    return (
        <div>
            <Banner />

            <div id="content">
                {isLoading ? <Loading /> : null}

                <h1>{title}</h1>

                <div className="article-details">
                    <p>by {author}</p>
                    <p>{dateFormatted}</p>
                    <p>{topic}</p>
                </div>

                <div className="article-body">
                    <img src={article_img_url} alt="title" />
                    <p>{body}</p>
                </div>

                <div className="article-buttons">
                    <p>{voteCounter}👍 <button onClick={clickHandler}>vote</button></p>
                </div>

                <h1>Comments</h1>
                <p>{comment_count}💬</p>

                <CommentForm article_id={article_id} />

                {comment_count === 0 ?
                    <h2>Be the first to comment...</h2> :
                    <ArticleCommentCards article_id={article_id} comment_count={comment_count} display_count={5} />
                }
            </div>


            <Footer />
        </div>

    )
}