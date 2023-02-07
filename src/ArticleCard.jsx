import { Link } from "react-router-dom"

export const ArticleCard = ({ article }) => {
    const { article_id, title, topic, author, created_at, votes, article_img_url, comment_count } = article
    const date = new Date(created_at)
    const dateFormatted = date.toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' });

    return (

        <div className="article-card">
            <div class="article-card-img">
                <Link to={`./${article_id}`}>
                    <img src={article_img_url} alt={title} />
                </Link>
            </div>

            <div class="article-card-text">
                <div class="article-card-title">
                    <Link to={`./${article_id}`}>
                        <h1>{title}</h1>
                    </Link>
                </div>

                <div class="article-card-details">
                    <p>by {author}  -  {dateFormatted}</p>
                    <p>{topic}</p>
                    <p class="article-card-buttons">{votes}👍 <button>vote</button> {comment_count}💬 <button>comments</button></p>
                </div>
            </div>
        </div>
    )
}