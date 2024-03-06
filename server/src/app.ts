import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routers/userRoute";
import drepRoutes from "./routers/drepRoute";
import proposalRoutes from "./routers/proposalsRoute";
const app = express();

// update as needed - only max 1gb data can be received from client
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ extended: true, limit: '1gb' }));

app.use(cookieParser());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/drep", drepRoutes);
app.use("/api/v1/proposal", proposalRoutes);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});