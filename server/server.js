import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from './Routes/AuthRoutes.js'

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use('/api/v1', authRoutes)
;(
  // db connectivity
  () => {
    mongoose
      .connect("mongodb://127.0.0.1/jwt")
      .then((err) => {
        app.listen(3000, () => {
          console.log("server is running on PORT-3000");
        });
      })
      .catch((err) => {
        console.log("error while connecting to DB", err);
      });
  }
)()
