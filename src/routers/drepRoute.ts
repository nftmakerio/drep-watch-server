import { Router } from "express";
import { createDrep, getDrepProfile, getDrepSearch, getDreps } from "../controllers/drepController";

const drepRoutes = Router();


drepRoutes.get("/", getDreps);
drepRoutes.post("/create", createDrep);
drepRoutes.post("/drep-profile",getDrepProfile);
drepRoutes.get("/query",getDrepSearch);

export default drepRoutes;
