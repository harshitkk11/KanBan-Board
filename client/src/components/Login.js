import kanban from "../assets/images/KanBan-Board.png"
import { useState, useContext } from "react"
import toast from 'react-hot-toast'
import axios from "axios"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [click, setClick] = useState(false)
    const [send, setSend] = useState("Log In")


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setClick(true)
            setSend("Please Wait..")
            const response = await axios.post('/login', {
                username, password
            })

            if (response.data){
                setUser(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
                setUsername("")
                setPassword("")
                setClick(false)
                setSend("Log In")
                navigate("/")
            } 
            if (!response.data) {
                setClick(false)
                setSend("Log In")
                toast.error("Incorrect Username or Password")
            }
        } catch (error) {
            setClick(false)
            setSend("Log In")
            toast.error("Something went wrong!!")
            console.log(error)
        }
    }
    
    return (
        <div className="form">
            <div className="form-img-div">
                <img src={kanban} alt="KanBan Board"/>
            </div>

            <div className="login-form-div">
                <h1 className="login-heading">Welcome back!</h1>
                <p>Please enter your details</p>
                <form className="login-form" action="" onSubmit={handleSubmit}>

                    <input id="username" 
                        className="username" 
                        type="text" 
                        placeholder="Username" 
                        disabled={click}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ""))}
                        value={username}
                        required
                    />
                    <br />

                    <input id="password" 
                        className="password" 
                        type="password" 
                        placeholder="Password" 
                        disabled={click}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <br />
                    
                    <a href="/forgot" className="forgotpass">Forgot Password?</a>
                    <br />


                    <input type="submit" value={send} className="submit" disabled={click}/>

                    <div className="signup-link">
                        <p>Don't have an account?</p>
                        <a href="/signup">Signup</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login