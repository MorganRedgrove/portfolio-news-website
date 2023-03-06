import { useState, useEffect } from "react"
import { getTopics } from "../utils/ApiCalls"
import { Banner } from "../components/Banner"
import { Footer } from "../components/Footer"
import { Loading } from "../components/Loading"
import { Error } from "../components/Error"
import { TopicCard } from "../components/TopicCard"


export const Topics = () => {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getTopics()
            .then((topics) => {
                setTopics(topics)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err.response.statusText)

            })
    }, [setIsLoading])

    if (error) {
        return (
            <Error msg={error}/>
        )
    }

    return (
        <div>
            <Banner />

            <div class="content">
                <h1>Topics</h1>

                {isLoading ? <Loading /> : null}

                {topics.map((topic) => {
                    return (
                        <TopicCard topic={topic}></TopicCard>
                    )
                })}
            </div>

            <Footer />
        </div>


    )
}