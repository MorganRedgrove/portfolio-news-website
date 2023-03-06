import { Link } from "react-router-dom"

export const TopicCard = ({ topic: { slug, description } }) => {
    return (
        <Link to={`/articles/${slug}`}>
            <div class="topic-card">

                <h2>{slug[0].toUpperCase() + slug.slice(1)}</h2>

                <p>{description}</p>

            </div>
        </Link>
    )
}