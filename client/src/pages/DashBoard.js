import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import { ColorContext } from "../contexts/ColorContext"
import { useNavigate } from "react-router-dom"
import { MdPersonOutline, MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import kanbanimg from "../assets/images/kanban-method.png"


const Dashboard = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    const { color, setColor } = useContext(ColorContext);
    const username = user.username

    const [boards, setBoards] = useState({})
    const [boardname, setBoardname] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState("flex");


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
                boardname,
                color
            })

            if (response.data) {
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
                    setLoader("none")
                }
                setLoader("none")
            } catch (error) {
                setLoader("none")
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
            }} style={{ background: board.color }}>
                <p>{board.boardname}</p>
            </button>
        }
        )
    }

    return (
        <div className="dashboard">
            <div className="user-div">
                <div className="user-name">
                    <span><MdPersonOutline /></span>
                    <h3>{user.name}</h3>
                </div>
                <div className="logout-btn">
                    <button className="logout" onClick={handleLogout}>Log Out</button>
                </div>
            </div>

            <div className="loader-div" style={{display: loader}}>
                <div className="loader"></div>
            </div>

            <div className="board-div">
                <h3>Boards</h3>

                {(!boardlist || boardlist.length === 0) ? <div className="create-board-div">
                    <img src={kanbanimg} alt="kanban-method"/>
                    <p>Boards in NexTask are where tasks move between lists,
                         helping you manage projects efficiently.
                    </p>
                    <button className="create-board" 
                        // style={{ background: "#484848" }} 
                        onClick={() => setIsOpen(true)}
                    >
                        Create new board
                    </button>
                </div>
                
                : <div className="boards" >
                    <button className="board" style={{ background: "#484848" }} onClick={() => setIsOpen(true)}>
                        <p>Create new board</p>
                    </button>
                    {list}
                </div>
                }

                {isOpen && (
                        <div className="popup-div">
                            <div className="popup-top">
                                <p>Create Board</p>
                                <button className="popup-close" onClick={() => setIsOpen(false)}>
                                    <MdClose />
                                </button>
                            </div>
                            <br />
                            <form className="board-name-form" onSubmit={handleSubmit}>
                                <label id="background">Background</label>
                                <ul id="background" className="board-background">

                                    <li><button className="color1 b-color" onClick={(e) => {
                                        e.preventDefault()
                                        setColor("linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(218,109,126,1) 100%)")
                                    }}></button>
                                    </li>

                                    <li>
                                        <button className="color2 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("linear-gradient(120deg, rgba(102,21,153,1) 43%, rgba(45,91,196,1) 100%)")
                                        }}></button>
                                    </li>

                                    <li>
                                        <button className="color3 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)")
                                        }}></button>
                                    </li>

                                    <li>
                                        <button className="color4 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("radial-gradient(circle, rgba(231,24,115,1) 0%, rgba(148,233,182,1) 100%)")
                                        }}></button>
                                    </li>

                                    <li>
                                        <button className="color5 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)")
                                        }}></button>
                                    </li>

                                    <li>
                                        <button className="color6 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)")
                                        }}></button>
                                    </li>

                                    <li>
                                        <button className="color7 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("linear-gradient(90deg, rgba(140,58,180,1) 0%, rgba(253,29,220,1) 50%, rgba(69,112,252,1) 100%)")
                                        }}></button>
                                    </li>

                                    <li>
                                        <button className="color8 b-color" onClick={(e) => {
                                            e.preventDefault()
                                            setColor("linear-gradient(120deg, rgba(153,67,21,1) 43%, rgba(49,196,45,1) 100%)")
                                        }}></button>
                                    </li>
                                </ul>
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
            </div>
        </div>
    )
}

export default Dashboard