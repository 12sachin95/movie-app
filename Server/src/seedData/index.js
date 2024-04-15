import mongoose from "mongoose";
import { MovieData } from "../model/MovieModel.js";
import { jsonData } from "./data.js";
const url = process.env.MONGO_URL;

export const Connection = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data (optional, for clean seeding)
    await MovieData.deleteMany({});

    // Insert data in bulk
    await MovieData.insertMany(jsonData);

    console.log("Data seeded successfully");
    console.log("conection succesfull");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

Connection();
