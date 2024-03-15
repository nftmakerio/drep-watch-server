import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post("/create", createUser);
userRoutes.get("/:wallet_address",getUser);

export default userRoutes;
