import express from "express";
import {
  deleteUser,
  getAllUsers, 
  signup,
  updateUser,
  getBookingsOfUser,
  getUserById,
  login,
} from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.get("/:id", getUserById);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);

export default userRouter;