import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const EditMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const movie = location.state;
  const { title, year, imdbRating, genres, storyline } = movie;
  const genre = genres.toString();
  const [formvalue, setformvalue] = useState({
    title: title,
    year: year,
    imdbRating: imdbRating,
    genres: genre,
    storyline: storyline,
  });
  const gotofunction = (e) => {
    const { name, value } = e.target;
    setformvalue((previews) => ({ ...previews, [name]: value }));
  };
  const submitData = async (e) => {
    e.preventDefault();
    await axios.put("/api/updatemovie/" + id, formvalue);
    navigate("/");
  };
  return (
    <div className="container my-2">
      <form className="row g-3">
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Movie Title
          </label>
          <input
            type="text"
            maxLength="30"
            className="form-control"
            id="inputAddress"
            name="title"
            value={formvalue.title}
            onChange={(e) => gotofunction(e)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">
            Release year
          </label>
          <input
            type="Number"
            min="1970"
            max="2021"
            className="form-control"
            id="inputAddress"
            minLength="4"
            maxLength="4"
            placeholder="2021"
            name="year"
            value={formvalue.year}
            onChange={(e) => gotofunction(e)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">
            Rating
          </label>
          <input
            type="number"
            min="0"
            max="10"
            className="form-control"
            id="inputAddress"
            placeholder="0-10"
            name="imdbRating"
            value={formvalue.imdbRating}
            onChange={(e) => gotofunction(e)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Action, drama, comedy"
            name="genres"
            value={formvalue.genres}
            onChange={(e) => gotofunction(e)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputCity" className="form-label">
            Storyline
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Movie story ....."
            id="inputCity"
            name="storyline"
            value={formvalue.storyline}
            onChange={(e) => gotofunction(e)}
          />
        </div>

        <div className="col-12">
          <button
            type="button"
            className="btn btn-dark"
            onClick={(e) => submitData(e)}
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMovie;
