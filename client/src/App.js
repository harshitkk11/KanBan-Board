import { Routes, Route } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from "axios"
import NavBar from "./components/NavBar.js";
import Login from "./components/Login.js"
import Signup from "./components/Signup.js";
import Forgot from "./components/Forgot.js";
import { UserContext } from "./contexts/UserContext.js";
import { ColorContextProvider } from "./contexts/ColorContext.js";

const Dashboard = lazy(() => import("./pages/DashBoard.js"))
const Board = lazy(() => import("./pages/Board.js"))

axios.defaults.baseURL = 'https://kanbanzen.vercel.app/';
// axios.defaults.withCredentials = true;


function App() {
  const [user, setUser] = useState()
  const [isloggedin, SetIsloggedin] = useState("none")

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
        SetIsloggedin("loggedin")
    }
    else {
      SetIsloggedin("notloggedin")
    }
  }, [setUser]);

  function Auth() {
    return <>
      {isloggedin === "notloggedin" && <Login />}

      {isloggedin === "loggedin" && 
        <Suspense fallback={
          <div className="loader-div">
            <div className="loader"></div>
          </div>
        }>
          <Dashboard />
        </Suspense>
      }
      </>
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <ColorContextProvider>
        <div className="App">
          <NavBar />
          <Toaster position="bottom-center" toastOptions={{duration:2500}}/>
          <div className="pages">
            <Routes>
              
              <Route 
                path="/" 
                element={<Auth/>}
              />

              <Route
                path="/login"
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

              {isloggedin === "notloggedin" && 
                <>
                  <Route path="*" element={<Login />} />
                </>
              }

              {isloggedin === "loggedin" && 
                <>
                  <Route
                    path="/board"
                    element={
                      <Suspense fallback={
                        <div className="loader-div">
                          <div className="loader"></div>
                        </div>
                      }>
                        <Board />
                      </Suspense>
                    }
                  />

                  <Route path="*" element={<PageNotFound />} />
                </>
              }
            </Routes>
          </div>
        </div>
      </ColorContextProvider>
    </UserContext.Provider>
  )
}

function PageNotFound() {
  return (
    <div style={
      {
        width: "100vw",
        height: "100vh",
        display: "flex", 
        justifyContent: "center",
        background: "#f3f3f3"
      }
    }>
      <h2>Page not found.</h2>
    </div>
  );
}

export default App;
