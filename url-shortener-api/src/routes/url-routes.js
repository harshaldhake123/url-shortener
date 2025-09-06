import express from "express";
import { getLongUrl, shorten } from "../controllers/url-controller.js";

export const urlRoutes = express.Router();

urlRoutes.post("/shorten", shorten);

urlRoutes.get("/getLongUrl", getLongUrl);
