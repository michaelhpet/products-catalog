import express from "express";
import { validateGETProducts } from "./validation";
import { getProducts } from "./controller";

const router = express.Router();

router.get("/", validateGETProducts, getProducts);

export default router;
