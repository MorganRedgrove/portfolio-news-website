import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Banner } from "../components/Banner"
import { Footer } from "../components/Footer"
import { UserContext, UsersContext } from "../contexts/contexts"



export const Login = () => {
    const { users } = useContext(UsersContext)
    const { setUser } = useContext(UserContext)

    const [input, setInput] = useState("")

    const navigate = useNavigate()

    const login = () => {
        const user = users.filter((user) => {
            return user.username === input
        })[0]

        if (user) {
            setUser(user)
            setTimeout(navigate(-1)
                , 2000)
        } else {
            alert("This user does not exist")
        }
    }

    const changeHandler = (event) => {
        setInput(event.target.value)
    }


    return (
        <div>
            <Banner />

            <h1>Login</h1>

            <div class="content">
                <input type="text" onChange={changeHandler} />
                <button onClick={login}>login</button>
            </div>

            <Footer />

        </div>


    )
}