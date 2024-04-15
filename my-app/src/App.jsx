import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetails from "./components/Details/MovieDetails";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditMovie from "./components/EditMovie/EditMovie";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import SignUp from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getUser = () => {
    if (!user) {
      fetch("/auth/authUser", {
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
          setLoading(false);
          setUser(resObject.user);
        })
        .catch((err) => {
          setLoading(false);
          setUser(null);
        });
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setUser={setUser} />
        {loading ? (
          <p>Loading...</p>
        ) : (
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
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <SignUp />}
            ></Route>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
