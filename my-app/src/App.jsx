import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetails from "./components/Details/MovieDetails";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditMovie from "./components/EditMovie/EditMovie";
import Login from "./components/Login";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const getUser = () => {
    fetch("http://localhost:8080/auth/authUser", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  console.log("=====user", user);
  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/Details/:id"
            element={user ? <MovieDetails /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/EditMovie/:id"
            element={user ? <EditMovie /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
