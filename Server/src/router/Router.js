import express from "express";
import { MovieData } from "../model/MovieModel.js";

export const router = express.Router();

router.post("/PostMovies", async (req, res) => {
  try {
    const data = await new MovieData(req.body);
    await data.save();
    res.status(200).send("success");
    console.log(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getmovies", async (req, res) => {
  try {
    const data = await MovieData.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getmovie/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await MovieData.find({ id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/updatemovie/:id", async (req, res) => {
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
    res.status(400).send(error.message);
  }
});
