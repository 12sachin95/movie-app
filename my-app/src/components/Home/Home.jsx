import { useEffect, useState } from "react";
import MovieCard from "../movie_card/MovieCard";
import { categories } from "../../Categories";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [tab, settab] = useState("All Movie");
  const [movieslist, setmovieslist] = useState([]);
  const [category, setcategory] = useState("");
  const [FilteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const Movies = await axios.get(`${process.env.REACT_APP_URL}/getmovies`);
      setmovieslist(Movies.data);
      setFilteredMovies(Movies.data);
    };
    getMovies();
  }, []);

  const filtermovies = (value) => {
    const filtred = movieslist.filter((movie) => movie.genres.includes(value));
    setcategory(value);
    setFilteredMovies(filtred);
  };
  const settingtab = (value) => {
    if (value === "All Movie") {
      settab("All Movie");
      setFilteredMovies(movieslist);
    } else {
      settab("Genre");
      setFilteredMovies([]);
      setcategory("");
    }
  };
  return (
    <div className="container-fluid mt-3">
      <div className="tabs">
        <ul>
          <li
            className={tab === "All Movie" ? "active" : ""}
            onClick={() => settingtab("All Movie")}
          >
            All Movies
          </li>
          <li
            className={tab === "Genre" ? "active" : ""}
            onClick={() => settingtab("Genre")}
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
                onClick={() => filtermovies(value)}
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
          {FilteredMovies.map((cvalue) => (
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
