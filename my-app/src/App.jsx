import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetails from "./components/Details/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditMovie from "./components/EditMovie/EditMovie";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route  path="/" element={<Home />}></Route>
          <Route path="/Details/:id" element={<MovieDetails />}></Route>
          <Route path="/EditMovie/:id" element={<EditMovie />}></Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
