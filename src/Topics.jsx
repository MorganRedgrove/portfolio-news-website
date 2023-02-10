import { useState, useEffect, useContext } from "react"
import { getTopics } from "./ApiCalls"
import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { Loading } from "./Loading"
import { TopicCard } from "./TopicCard"

import { LoadingContext } from "./contexts/contexts"

export const Topics = () => {
    const { isLoading, setIsLoading } = useContext(LoadingContext)

    const [topics, setTopics] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getTopics()
            .then((topics) => {
                setTopics(topics)
                setIsLoading(false)
            })
    }, [])

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