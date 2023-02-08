import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { patchArticle } from "./ApiCalls"

import { UserContext, VotingContext } from "./contexts/contexts"

export const ArticleCard = ({ article }) => {
    const { user } = useContext(UserContext)
    const { voteHistory, setVoteHistory } = useContext(VotingContext)

    const [voteCounter, setVoteCounter] = useState(article.votes)

    const { article_id, title, topic, author, created_at, article_img_url, comment_count } = article
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });

    const navigate = useNavigate()

    const clickHandler = () => {
        const { username } = user
        if (voteHistory?.[username]?.[article_id]) {
            alert(`Sorry ${username}, you have already voted on this article`)
        } else {
            setVoteCounter(voteCounter + 1)
            patchArticle(article_id, 1)
                .then(() => {
                    voteHistory[username][article_id] = true
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

        <div className="article-card">
            <div className="article-card-img">
                <Link to={`./${article_id}`}>
                    <img src={article_img_url} alt={title} />
                </Link>
            </div>

            <div className="article-card-text">

                <Link to={`./${article_id}`}>
                    <h1>{title}</h1>
                </Link>

                <p>by {author}</p>
                <p>{dateFormatted}</p>
                <p>{topic}</p>
                <p className="article-card-buttons">{voteCounter}👍 <button onClick={clickHandler}>vote</button> {comment_count}💬 <button onClick={() => { navigate(`./${article_id}/comments`) }}>comments</button></p>

            </div>
        </div>
    )
}