import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserPoints,
  addPoints,
  deductPoints,
  getUserById,
  updateUserLocation,
} from "../controllers/user.controller";
import { validateToken } from "../middleware/validateTokenHandler";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", validateToken, getUsers);
router.get("/user/:id", validateToken, getUserById);
router.get("/user/:id/points", validateToken, getUserPoints);
router.post("/user/:id/points", validateToken, addPoints);
router.post("/user/:id/points/deduct", validateToken, deductPoints);
router.put("/user/:id/location", validateToken, updateUserLocation);

export default router;
