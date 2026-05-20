import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import leadRoutes from "./routes/leadRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use("/api/auth", authRoutes);

app.use("/api/leads", leadRoutes);

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

    app.listen(
      process.env.PORT || 5000,
      () => {

        console.log(
          "Server running on port 5000"
        );

      }
    );

  })
  .catch((err) =>
    console.log(err)
  );