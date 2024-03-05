import { Router } from "express";
import { createUser } from "../controllers/userController";

const userRoutes = Router();

// http://localhost:4000/api/v1/create-user
userRoutes.post("/create-user", createUser);

export default userRoutes;
