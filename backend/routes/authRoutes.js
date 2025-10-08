import express from "express";
// import { registerUser , loginUser } from "../controllers/authController.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyToken
} from '../controllers/authController.js';
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyToken, logoutUser);

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  });
  

export default router;