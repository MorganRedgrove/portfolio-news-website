import { useContext } from "react"

import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { ArticleCard } from "./ArticleCard"
import { Loading } from "./Loading"

import { LoadingContext } from "./contexts/Loading"


export const Articles = ({ articles }) => {
    const { isLoading, setIsLoading } = useContext(LoadingContext)

    return (
        <div>
            <Banner></Banner>

            <div id="content">
                <h1>Articles</h1>

                {isLoading ? <Loading /> : null}

                {articles.map((article) => {
                    return (
                        <ArticleCard article={article} key={article.article_id} />
                    )
                })}
            </div>

            <Footer></Footer>
        </div>
    )
}