import  mongoose  from "mongoose";

const movieSchema = new mongoose.Schema({
    id:Number,
    title:String,
    year:String,
    genres:Array,
    ratings:Array,
    poster:String,
    contentRating:String,
    duration:String,
    releaseDate:String,
    averageRating:Number,
    originalTitle:String,
    storyline:String,
    actors:Array,
    imdbRating:String,
    posterurl:String
})

export const MovieData = new mongoose.model("MovieData",movieSchema) 