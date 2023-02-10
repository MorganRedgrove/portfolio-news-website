import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { deleteComment, getUser } from "./ApiCalls"
import { UserContext } from "./contexts/contexts"

export const CommentCard = ({ comment }) => {
    const { user: { username } } = useContext(UserContext)

    const { comment_id, author, body, created_at, votes } = comment
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleString("en-GB", { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' });

    const [avatar, setAvatar] = useState("https://static.vecteezy.com/system/resources/previews/000/440/213/original/question-mark-vector-icon.jpg")

    const navigate = useNavigate()

    useEffect(() => {
        getUser(author)
            .then(({ avatar_url }) => {
                setAvatar(avatar_url)
            })
    }, [])

    const clickHandler = (comment_id) => {
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
                <p className="comment-card-buttons">{votes}👍 <button>vote</button></p>
            </div>

            <div className="comment-card-text">
                <p>{body}</p>
                <br />
                <p className="comment-card-timestamp">{dateFormatted}</p>
                {author === username ?
                    <button onClick={() => { clickHandler(comment_id) }}>delete</button> :
                    null
                }
            </div>
        </div>
    )

}