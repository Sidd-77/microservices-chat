import mongoose from "mongoose";

const MongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/db";

export async function connectDB() {
  await mongoose
    .connect(MongoURI)
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log(err);
    });
}
