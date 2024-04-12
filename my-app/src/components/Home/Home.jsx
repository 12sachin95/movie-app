import { useEffect, useState } from "react";
import MovieCard from "../movie_card/MovieCard";
import { categories } from "../../Categories";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [tab, settab] = useState("All Movie");
  const [movieslist, setmovieslist] = useState([]);
  const [category, setCategory] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const Movies = await axios.get(`/getmovies`);
      setmovieslist(Movies.data);
      setFilteredMovies(Movies.data);
    };
    getMovies();
  }, []);

  const filterMovies = (value) => {
    console.log(value, categories);
    const filtred = movieslist.filter((movie) => movie.genres.includes(value));
    setCategory(value);
    setFilteredMovies(filtred);
  };
  const settingTab = (value) => {
    if (value === "All Movie") {
      settab("All Movie");
      setFilteredMovies(movieslist);
    } else {
      filterMovies(categories[0]);
      settab("Genre");
    }
  };
  return (
    <div className="container-fluid mt-3">
      <div className="tabs">
        <ul>
          <li
            className={tab === "All Movie" ? "active" : ""}
            onClick={() => settingTab("All Movie")}
          >
            All Movies
          </li>
          <li
            className={tab === "Genre" ? "active" : ""}
            onClick={() => settingTab("Genre")}
          >
            Genre
          </li>
        </ul>
      </div>

      {tab === "Genre" ? (
        <div className="tabs_small">
          <ul>
            {categories.map((value) => (
              <li
                onClick={() => filterMovies(value)}
                className={value === category ? "active" : ""}
                style={{ textTransform: "capitalize" }}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
      <div className="movie_list">
        <div className="row">
          {/* {tab === "All Movie" ? (
            <>
              {movieslist.map((cvalue) => (
                <div
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                  key={cvalue.id}
                >
                  <MovieCard movies={cvalue} />
                </div>
              ))}
            </>
          ) : (
            <> */}
          {filteredMovies.map((cvalue) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cvalue.id}>
              <MovieCard movies={cvalue} />
            </div>
          ))}
          {/* </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
