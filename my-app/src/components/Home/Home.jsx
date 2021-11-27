import { useEffect, useState } from "react";
import MovieCard from "../movie_card/MovieCard";
import axios from "axios";
import "./home.scss";

const Home = () => {
  const [tab, settab] = useState("All Movie");
  const [movieslist, setmovieslist] = useState([]);
  const [category, setcategory] = useState("");
  const [FilteredMovies, setFilteredMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const Movies = await axios.get("/api/getmovies");
      setmovieslist(Movies.data);
    };
    getMovies();
  }, []);

  const categories = [
    "Action",
    "Animation",
    "Adventure",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "History",
    "Horror",
    "Musical",
    "Romance",
    "Sci-Fi",
    "Thriller",
  ];

  const filtermovies = (value) => {
    const filtred = movieslist.filter((movie) => movie.genres.includes(value));
    setcategory(value);
    setFilteredMovies(filtred);
  };

  return (
    <div className="container-fluid mt-3">
      <div className="tabs">
        <ul>
          <li
            className={tab === "All Movie" ? "active" : ""}
            onClick={() => settab("All Movie")}
          >
            All Movies
          </li>
          <li
            className={tab === "Genre" ? "active" : ""}
            onClick={() => settab("Genre")}
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
          {tab === "All Movie" ? (
            <>
              {movieslist.map((cvalue) => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cvalue.id}>
                  <MovieCard movies={cvalue} />
                </div>
              ))}
            </>
          ) : (
            <>
              {FilteredMovies.map((cvalue) => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={cvalue.id}>
                  <MovieCard movies={cvalue} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
