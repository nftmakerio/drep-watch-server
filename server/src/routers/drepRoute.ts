import { Router } from "express";
import { createDrep, getDrepProfile } from "../controllers/drepController";

const drepRoutes = Router();

// http://localhost:4000/api/v1/drep/create
drepRoutes.post("/create", createDrep);
drepRoutes.post("/drep-profile",getDrepProfile);

export default drepRoutes;
