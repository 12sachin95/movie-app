import express from "express";
import { MovieData } from "../model/MovieModel.js";
import { isAuthenticated } from "../utils/isAuthenticated.js";

export const router = express.Router();

router.post("/PostMovies", isAuthenticated, async (req, res) => {
  try {
    const data = await new MovieData(req.body);
    await data.save();
    res.status(200).send("success");
  } catch (error) {
    res.status(400).send("message :", error.message);
  }
});

router.get("/getmovies", isAuthenticated, async (req, res) => {
  try {
    const data = await MovieData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send("message :", error.message);
  }
});

router.get("/getmovie/:id", isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MovieData.find({ id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send("message :", error.message);
  }
});

router.put("/updatemovie/:id", isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    const genre = req.body.genres.toLowerCase().split(",");
    const movie = await MovieData.findOneAndUpdate(
      { id: id },
      { ...req.body, genres: genre },
      { new: true }
    );
    res.status(200).send(movie);
  } catch (error) {
    res.status(400).send("message :", error.message);
  }
});
