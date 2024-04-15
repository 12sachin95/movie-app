import mongoose from "mongoose";
import { MovieData } from "./model/MovieModel.js";
import { jsonData } from "./seedData/data.js";

export const Connection = async () => {
  const url = process.env.MONGO_URL;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // // Clear existing data (optional, for clean seeding)
    // await MovieData.deleteMany({});

    // // Insert data in bulk
    // await MovieData.insertMany(jsonData);
    // console.log("conection succesfull");
  } catch (error) {
    console.log(error);
  }
};
