import express from "express";

import {
  registerUser,
  loginUser,
} from "../controllers/authController";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected Profile Route",
  });
});

export default router;