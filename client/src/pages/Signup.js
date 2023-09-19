import kanban from "../assets/images/KanBan-Board.png"
import { useState } from "react"
import toast from 'react-hot-toast'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [click, setClick] = useState(false)
    const [send, setSend] = useState("Sign Up")

    const specialChars = /[@!#$%^&*()+=_,.`~-\d]/;

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name.length < 4 || specialChars.test(name)) {
            toast.error("Invalid Name")
        } 
        
        else if (username < 4 || /[ @!#$%^&*()+=_,.`~-]/.test(username)){
            toast.error("Invalid Username")
        }

        else if (password.length < 8){
            toast.error("Invalid Password")
        }

        else {
            setClick(true)
            setSend("Please Wait..")

            const response = await axios.post('/signup', {
                name,
                username,
                email, 
                password
            })

            if (response){
                
                if (response.data === "username exist") {
                    setClick(false)
                    setSend("Sign Up")
                    toast.error("Username already exist!!")
                }

                else if (response.data === "email exist") {
                    setClick(false)
                    setSend("Sign Up")
                    toast.error("Email already exist!!")
                }
                else if (response.data === "notExist") {
                    setName("")
                    setUsername("")
                    setEmail("")
                    setPassword("")
                    setClick(false)
                    setSend("Sign Up")
                    navigate("/")
                    toast.success("Account Created Successfully!!")
                }
            }
        }
    }
    
    return (
        <div className="form">
            <div className="form-img-div">
                <img src={kanban} alt="KanBan Board"/>
            </div>

            <div className="signup-form-div">
                <form className="signup-form" action="" onSubmit={handleSubmit}>
                    <h1 className="signup-heading">Sign Up</h1>
                    <br />

                    <input id="name" 
                        className="name" 
                        type="text" 
                        placeholder="Name" 
                        disabled={click}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                    <br/>

                    <input id="username" 
                        className="username" 
                        type="text" 
                        placeholder="Username" 
                        disabled={click}
                        onChange={(e) => {setUsername(e.target.value.toLowerCase())}}
                        value={username}
                        required
                    />
                    <br />

                    <input id="email" 
                        className="email" 
                        type="email" 
                        placeholder="Email" 
                        disabled={click}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <br/>

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
                    <br/>

                    <input type="submit" value={send} className="submit" disabled={click}/>

                    <div className="signup-link">
                        <p>Already have an account?</p>
                        <a href="/">Log in</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup