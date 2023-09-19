import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from "axios"
import NavBar from "./components/NavBar.js";
import Login from "./components/Login"
import Signup from "./pages/Signup.js";
import Forgot from "./pages/Forgot.js";
import Dashboard from "./pages/DashBoard.js"
import Board from "./pages/Board.js";
import { UserContext } from "./contexts/UserContext.js";


axios.defaults.baseURL = 'https://kanbanzan-server.onrender.com';
// axios.defaults.withCredentials = true;

function App() {
  const [user, setUser] = useState()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
    }
  }, [setUser]);

  if (!user) {
    return (
      <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Toaster position="bottom-center" toastOptions={{duration:2500}}/>
          <div className="pages">
            <Routes>
            <Route
                path="/"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/forgot"
                element={<Forgot />}
              />
              <Route path="*" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );

  }


  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Toaster position="top-center" toastOptions={{duration:2500}}/>
          <div className="pages">
            <Routes>
            <Route
                path="/"
                element={<Dashboard />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/board"
                element={<Board />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/forgot"
                element={<Forgot />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

function PageNotFound() {
  return (
    <>
    <br/>
    <br/>
    <br/>
      <h2>404 Page not found</h2>
    </>
  );
}

export default App;
