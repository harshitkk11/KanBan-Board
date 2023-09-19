import { useEffect, useContext } from "react"
import { UserContext } from "../contexts/UserContext"


const Home = () => {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, [setUser]);


    // If logged successfully return dashboard
    if (user) {
        return <Dashboard/>
    }

    // else return login page
    if (!user) {
        return (
            <Login />
        )
    }
}

export default Home