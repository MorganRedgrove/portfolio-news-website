import { Link } from "react-router-dom"

import { Banner } from "./Banner"
import { Footer } from "./Footer"



export const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <div id="content">
                <h1>This is the Home page</h1>

                <Link to="/articles">go to articles</Link>
            </div>

            <Footer></Footer>
        </div>
    )
}