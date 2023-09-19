import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { MdPersonOutline, MdClose } from "react-icons/md";
import toast from "react-hot-toast";


const Dashboard = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    const username = user.username

    const [boards, setBoards] = useState({})
    const [boardname, setBoardname] = useState("")
    const [isOpen, setIsOpen] = useState(false);


    const handleLogout = () => {
        window.location.reload();
        setUser({});
        localStorage.clear();
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/createboard', {
                username,
                boardname
            })

            if (response.data){
                setIsOpen(false)
                setBoardname("")
                window.location.reload()
            }
        } catch (error) {
            toast.error("Some thing went wrong!!")
            console.log(error)
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('/getboards', {
                    username
                })

                if (response.data) {
                    setBoards(JSON.parse(JSON.stringify(response.data)))
                }
            } catch (error) {
                toast.error("Something went wrong!!")
                console.log(error)
            }
        }
        fetchData()
    }, [username])

    const boardlist = boards.boarddata
    
    if (boardlist) {
        var list = boardlist.map((board, index) => {
            return <button key={index} className="board" onClick={() => {
                localStorage.setItem('board', board._id)
                navigate("/board")
            }}>
                        <p>{board.boardname}</p>
                    </button>
        }
        )
    }

    return (
        <div className="dashboard">
            <div className="home">
                <div className="user-div">
                    <div className="user-name">
                        <span><MdPersonOutline/></span>
                        <h3>{user.name}</h3>
                    </div>
                    <div className="logout-btn">
                        <button className="logout" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
                
                <div className="board-div">
                    <h3>Boards</h3>
                    <div className="boards">
                        <button className="board" style={{ background:"#484848" }} onClick={() => setIsOpen(true)}>
                                <p>Create new board</p>
                        </button>
                    
                        {isOpen && (
                            <div className="popup-div">
                                <div className="popup-top">
                                    <p>Create Board</p>
                                    <button className="popup-close" onClick={() => setIsOpen(false)}>
                                            <MdClose/>
                                    </button>
                                </div>
                                <br/>
                                <form className="board-name-form" onSubmit={handleSubmit}>
                                    <label htmlFor="board-name">Board title</label>
                                    <input 
                                        id="board-name" 
                                        className="board-name" 
                                        name="board-name" 
                                        type="text" 
                                        autoComplete="off" 
                                        onChange={(e) => setBoardname(e.target.value)}
                                        required
                                    />
                                    <input id="board-submit" className="board-submit" 
                                            name="board-submit" type="submit" value="Create" />
                                </form>
                            </div>
                        )}
                        {list}
                    </div>
                </div>
            </div>
        </div>
    )   
}

export default Dashboard