import { useState, useEffect, useContext } from "react"
import { deleteComment, getUser } from "../utils/ApiCalls"
import { UserContext, PermissionsContext, VotingContext } from "../contexts/contexts"

import { patchComment } from "../utils/ApiCalls"

export const CommentCard = ({ comment }) => {
    const { user: { username } } = useContext(UserContext)

    const { comment_id, author, body, created_at, votes } = comment
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleString("en-GB", { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });

    const [voteCounter, setVoteCounter] = useState(votes)

    const { permissions } = useContext(PermissionsContext)
    const { voteHistory, setVoteHistory } = useContext(VotingContext)

    const [avatar, setAvatar] = useState("https://static.vecteezy.com/system/resources/previews/000/440/213/original/question-mark-vector-icon.jpg")



    useEffect(() => {
        getUser(author)
            .then(({ avatar_url }) => {
                setAvatar(avatar_url)
            })
    }, [author])

    const clickHandlerVote = () => {
        if (permissions?.[username]) {
            if (voteHistory?.[username]?.comments?.[comment_id]) {
                alert(`Sorry ${username}, you have already voted on this comment`)
            } else {
                setVoteCounter(votes + 1)
                alert("Thank you for voting!")
                patchComment(comment_id, 1)
                    .then(() => {
                        voteHistory[username] = {comments: {[comment_id]: true}}
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

    const clickHandlerDelete = (comment_id) => {
        deleteComment(comment_id)
            .then(() => {
                alert("Comment has been deleted")
                window.location.reload()
            })
    }


    return (
        <div className="comment-card">
            <div className="comment-card-user">
                <img src={avatar} alt={author} />
                <h3>{author}</h3>
                <p className="comment-card-buttons">{voteCounter}👍 <button onClick={() => {clickHandlerVote()}}>vote</button></p>
            </div>

            <div className="comment-card-text">
                <p>{body}</p>
                <br />
                <p className="comment-card-timestamp">{dateFormatted}</p>
                {author === username ?
                    <button onClick={() => { clickHandlerDelete(comment_id) }}>delete</button> :
                    null
                }
            </div>
        </div>
    )

}