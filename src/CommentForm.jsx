import { useState, useEffect, useContext } from "react"
import { PermissionsContext, UserContext, UsersContext } from "./contexts/contexts"
import { getUser, postComment } from "./ApiCalls"

export const CommentForm = ({ article_id }) => {
    const { user: { username, avatar_url }, setUser } = useContext(UserContext)
    const { users, setUsers } = useContext(UsersContext)
    const { permissions } = useContext(PermissionsContext)

    const hasPermission = permissions[username]

    const [body, setBody] = useState({})

    const comment = { username, body }

    const changeHandler = (event) => {
        setBody(event.target.value)
    }

    const selectHandler = (event) => {
        event.target.value !== "Guest" ?
            getUser(event.target.value)
                .then((user) => {
                    setUser(user)
                }) :
            setUser({ username: "Guest" })
    }


    onsubmit = (event) => {
        event.preventDefault()
        postComment(article_id, comment)
            .then(() => {
                alert("Comment posted!")
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
                alert("Sorry we couldn't post your comment")
            })
    }

    return (
        <div className="comment-form">
            <div className="comment-form-login">
                {username === "Guest" ?
                    <h3>You must be logged in to comment on this article</h3> :
                    <div>
                        <img src={avatar_url} alt={username} />
                        <h3>{username}</h3>
                    </div>
                }
                <select onChange={selectHandler}>
                    <option value="Guest">Guest</option>
                    {users.map(({ username }) => {
                        return (
                            <option key={username} value={username}>{username}</option>
                        )
                    })
                    }
                </select>
            </div>

            <div>
                <form className="form">
                    <textarea className="comment-form-textarea" onChange={changeHandler} disabled={!hasPermission} rows="5" cols="75"></textarea>
                    <div>
                        <button type="reset" disabled={!hasPermission}>reset</button>
                        <button type="submit" disabled={!hasPermission}>submit</button>
                    </div>

                </form>
            </div>
        </div>
    )

}