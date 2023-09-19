// import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <h3>KanbanZen</h3>
                </div>
                <div className='nav-selector' ></div>
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