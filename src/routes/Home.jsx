import { Link } from "react-router-dom"
import { Banner } from "../components/Banner"
import { Footer } from "../components/Footer"



export const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <div id="content">
                <h1>This is the Home page</h1>

                <Link to="/articles">go to articles</Link>

                <br />

                <Link to="/topics">go to topics</Link>
            </div>

            <Footer></Footer>
        </div>
    )
}