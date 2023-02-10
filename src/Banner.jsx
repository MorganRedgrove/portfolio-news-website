import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getTopics } from "./ApiCalls"


export const Banner = () => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        getTopics()
            .then((topics) => {
                setTopics(topics)
            })
    }, [])


    return (
        <div>
            <header>
                <h1>NC News</h1>
            </header>

            <nav>
                <Link to="/articles">Articles</Link>
                {topics.map(({ slug }) => {
                    return (
                        <Link to={`/articles/${slug}`}>{slug}</Link>
                    )
                })}
            </nav>
        </div>
    )
}