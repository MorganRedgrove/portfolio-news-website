import { Banner } from "./Banner"
import { Footer } from "./Footer"

export const Error = ({msg}) => {
    return (
        <div>
        <Banner></Banner>

        <div id="content">
            <h1>{msg}</h1>
        </div>

        <Footer></Footer>
    </div>
    )
}