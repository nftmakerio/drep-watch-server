import { Router } from "express";
import { createDrep } from "../controllers/drepController";

const drepRoutes = Router();

// http://localhost:4000/api/v1/drep/create
drepRoutes.post("/create", createDrep);

export default drepRoutes;
