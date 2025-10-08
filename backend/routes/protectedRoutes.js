import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protected/profile", verifyToken, (req, res) => {
    res.json({ user: { id: req.user.id, email: req.user.email, name: "Placeholder" } });
  });

export default router;