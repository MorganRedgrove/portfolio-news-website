export const ArticleCard = ({ article }) => {
    const { article_id, title, topic, author, created_at, votes, article_img_url, comment_count } = article
    const date = new Date(created_at).toDateString()
    return (
        <div className="article-card">
            <div>
                <img src={article_img_url} alt={title} />
            </div>

            <div class="text">
                <div>
                    <h1>{title}</h1>
                </div>

                <div>
                    <p>by {author} {date} {topic} {votes}👍 {comment_count}💬</p>
                </div>
            </div>
        </div>
    )
}