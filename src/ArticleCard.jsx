import { Link, useNavigate } from "react-router-dom"

export const ArticleCard = ({ article }) => {
    const { article_id, title, topic, author, created_at, votes, article_img_url, comment_count } = article
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });

    const navigate = useNavigate()

    return (

        <div className="article-card">
            <div class="article-card-img">
                <Link to={`./${article_id}`}>
                    <img src={article_img_url} alt={title} />
                </Link>
            </div>

            <div class="article-card-text">

                <Link to={`./${article_id}`}>
                    <h1>{title}</h1>
                </Link>

                <p>by {author}</p>
                <p>{dateFormatted}</p>
                <p>{topic}</p>
                <p class="article-card-buttons">{votes}👍 <button>vote</button> {comment_count}💬 <button onClick={() => { navigate(`./${article_id}/comments`) }}>comments</button></p>

            </div>
        </div>
    )
}