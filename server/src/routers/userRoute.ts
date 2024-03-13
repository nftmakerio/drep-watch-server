import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";

const userRoutes = Router();

// http://localhost:4000/api/v1/user/create
userRoutes.post("/create", createUser);
userRoutes.get("/:user_id",getUser);
// userRoutes.get("/profile/:user_id",getUserProfile);

export default userRoutes;
