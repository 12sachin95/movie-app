import { Link } from "react-router-dom";
import "./movieCard.scss";

const MovieCard = ({ movies }) => {
  return (
    <Link to={`/Details/${movies.id}`} className="link">
      <div className="card main_card d-flex align-items-center justify-content-center">
        <img
          src={movies.posterurl}
          height="230px"
          className="card-img-top"
          alt="..."
        />
        <div className="card_body">
          <h5 className=" text-center my-2 fw-light">
            {movies.title.slice(0, 20)}
          </h5>
          <p className="text-center fw-light">
            {movies.genres.map((value) => (
              <span key={value}>{value} </span>
            ))}
          </p>
          <hr className="mt-auto" />
          <div className="subtitle mb-0">
            <p>{movies.year}</p>
            <p>
              <i className="fas fa-star"></i>
              {movies.imdbRating ? movies.imdbRating : "4"}/10
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
