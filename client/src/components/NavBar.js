import { NavLink } from 'react-router-dom'
import logo from "../assets/images/nextask-logo.webp"

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <NavLink to="/"><img src={logo} alt="logo"/></NavLink>
                </div>
                {/* <div className='nav-selector' ></div> */}
                {/* <div className="nav-items">
                    <ul>
                        <li className='nav-item1'>
                            <NavLink to="/login">Log in</NavLink>
                        </li>
                        <li className='nav-item2'>
                            <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                        
                    </ul>
                </div> */}
            </div>
        </nav>
    )
}

export default NavBar