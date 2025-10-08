import express from "express";
import { getFeedback } from "../controllers/aiController.js";

const router = express.Router();

// POST route to get feedback on user's sentence
router.post("/feedback", getFeedback);

export default router;
