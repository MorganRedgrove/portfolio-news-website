import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import { Banner } from "../components/Banner"
import { Footer } from "../components/Footer"
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"
import { ArticleComments } from "../components/ArticleComments"
import { CommentForm } from "../components/CommentForm"

import { getArticle, patchArticle } from "../utils/ApiCalls"

import { UserContext, PermissionsContext, VotingContext } from "../contexts/contexts"


export const Article = () => {
    const params = useParams()
    const { article_id } = params

    const { user: { username } } = useContext(UserContext)
    const { permissions } = useContext(PermissionsContext)
    const { voteHistory, setVoteHistory } = useContext(VotingContext)

    const [article, setArticle] = useState({})
    const [voteCounter, setVoteCounter] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
                setError(err.response.statusText)

            })
    }, [article_id, setIsLoading])

    const clickHandler = () => {
        if (permissions?.[username]) {
            if (voteHistory?.[username]?.articles?.[article_id]) {
                alert(`Sorry ${username}, you have already voted on this article`)
            } else {
                setVoteCounter(voteCounter + 1)
                alert("Thank you for voting!")
                patchArticle(article_id, 1)
                    .then(() => {
                        voteHistory[username] = {articles: {[article_id] : true}}
                        setVoteHistory(voteHistory)
                    })
                    .catch((err) => {
                        console.log(err)
                        setVoteCounter(voteCounter)
                        alert("Sorry we couldn't process your vote")
                    })
            }            
        } else {
            alert("Sorry you must be logged in to vote")
        }

    }

    if (error) {
        return (
            <Error msg={error}/>
        )
    }

    return (
        <div>
            <Banner />

            <div id="content">
                {isLoading ? 
                    <Loading /> : 
                    <div>
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
                            <ArticleComments article_id={article_id} comment_count={comment_count} display_count={5} />
                        }
                    </div>                    
                    }
            </div>

            <Footer />
        </div>
    )
}