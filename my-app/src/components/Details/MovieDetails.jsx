import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./moviedetails.scss";

const MovieDetails = () => {
  const [movie, setmovie] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getdata = async () => {
      try {
        const data = await axios.get(`/getmovie/${id}`);
        setmovie(data.data[0]);
      } catch (e) {
        return console.log("===error", e);
      }
    };
    getdata();
  }, [id]);
  return (
    <div className="container mt-4  d-flex align-item-center justify-content-center">
      <div className="card mb-3 bg-light">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={movie.posterurl}
              className="img-fluid rounded-start card_img"
              alt="movieimg"
            />
          </div>
          <div className="col-md-8 d-flex align-items-center justify-content-spacebetween">
            <div className="card-body">
              <h1 className="card-title">{movie.title}</h1>
              <div className="middle">
                <span>{movie.year}</span>
                <span>{movie.duration && movie.duration.slice(2, 5)}</span>
                <span>
                  <i className="fas fa-star"></i>
                  {movie.imdbRating ? movie.imdbRating : 3}
                </span>
              </div>

              <div>
                <p>{[movie.genres].toString()}</p>
                <p>Starring : {[movie.actors].toString()}</p>
              </div>
              <div>
                <p className="card-text">{movie.storyline}</p>
              </div>
              <Link
                type="button"
                className="btn btn-dark mt-lg-3"
                state={movie}
                to={`/EditMovie/${movie.id}`}
              >
                Edit Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
