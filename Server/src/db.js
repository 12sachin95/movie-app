import mongoose from "mongoose";

export const Connection = async () => {
  const url = process.env.MONGO_URL;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("conection succesfull");
  } catch (error) {
    console.log(error);
  }
};
