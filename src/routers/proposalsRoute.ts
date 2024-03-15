import { Router } from "express";
import { createProposal, voteOnProposal } from "../controllers/proposalsController";

const proposalsRoute = Router();

// http://localhost:4000/api/v1/proposal/create
proposalsRoute.post("/create", createProposal);
proposalsRoute.post("/vote", voteOnProposal);


export default proposalsRoute;
