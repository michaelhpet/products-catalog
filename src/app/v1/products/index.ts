import express from "express";
import {
  validateDELETEProduct,
  validateGETProduct,
  validateGETProducts,
  validatePOSTProduct,
  validatePUTProduct,
} from "./validation";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./controller";

const router = express.Router();

router.get("/", validateGETProducts, getProducts);
router.get("/:id", validateGETProduct, getProduct);
router.post("/", validatePOSTProduct, createProduct);
router.put("/:id", validatePUTProduct, updateProduct);
router.delete("/:id", validateDELETEProduct, deleteProduct);

export default router;
