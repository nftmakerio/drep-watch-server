import { Router } from "express";
import {
  createDrep,
  getDrepProfile,
  getDrepProposals,
  getDrepSearch,
  getDreps,
} from "../controllers/drepController";

const drepRoutes = Router();

drepRoutes.get("/", getDreps);
drepRoutes.post("/create", createDrep);
drepRoutes.post("/drep-profile", getDrepProfile);
drepRoutes.get("/query", getDrepSearch);
drepRoutes.get("/proposals/:drep_id", getDrepProposals);

export default drepRoutes;
