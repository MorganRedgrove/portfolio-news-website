import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { CommentCard } from "./CommentCard"
import { Loading } from "./Loading"

import { getComments } from "./ApiCalls"

import { LoadingContext } from "./contexts/contexts"


export const ArticleCommentCards = ({ article_id, comment_count, display_count = 0 }) => {
    const { isLoading, setIsLoading } = useContext(LoadingContext)

    const [comments, setComments] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
            .then((comments) => {
                setComments(comments)
                setIsLoading(false)
            })
    }, [])

    const navigate = useNavigate()

    return (
        <div>
            {isLoading ? <Loading message="Loading Comments..." /> : null}
            <div>
                {comments.map((comment, index) => {
                    if (index <= display_count - 1) {
                        return (
                            <CommentCard comment={comment} key={comment.comment_id} />
                        )
                    }
                })}
            </div>

            <div>
                {(comment_count - display_count > 0) ?
                    <button onClick={() => { navigate("./comments") }}>read {comment_count - display_count} more comments</button> :
                    null
                }
            </div>
        </div>
    )
}