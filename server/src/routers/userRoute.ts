import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const userRoutes = Router();

userRoutes.post("/create", createUser);
userRoutes.get("/:user_id",getUser);

export default userRoutes;
