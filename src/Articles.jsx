import { Banner } from "./Banner"
import { Footer } from "./Footer"
import { ArticleCard } from "./ArticleCard"

export const Articles = ({ articles }) => {
    return (
        <div>
            <Banner></Banner>

            <div id="content">
                <h1>Articles</h1>

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