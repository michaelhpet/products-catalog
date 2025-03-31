import { NextFunction, Request, Response } from "express";
import * as service from "./service";
import { success } from "../../../utils";
import { Pagination } from "../../../types";

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number (optional)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of products per page (optional)
 *     responses:
 *       200:
 *         description: A list of products with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   type: object
 *                   properties:
 *                     pagination:
 *                       type: object
 */
export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { limit = 10, page = 1 } = req.query as unknown as Pagination;

    const { products, pagination } = await service.getProducts({ limit, page });

    res
      .status(200)
      .json(
        success(products, "Products retrieved successfully", { pagination })
      );
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID (required)
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const data = await service.getProduct(id);

    res.status(200).json(success(data, "Product retrieved successfully"));
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *               - price
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product (required)
 *               description:
 *                 type: string
 *                 description: Description of the product (required)
 *               category:
 *                 type: string
 *                 description: Category of the product (required)
 *               price:
 *                 type: number
 *                 description: Price of the product (required)
 *               sku:
 *                 type: string
 *                 description: SKU of the product (required)
 *               stock_status:
 *                 type: string
 *                 enum: [in_stock, out_of_stock]
 *                 description: Stock status of the product (optional)
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await service.createProduct(req.body);

    res.status(201).json(success(data, "Product created successfully"));
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID (required)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product (optional)
 *               description:
 *                 type: string
 *                 description: Description of the product (optional)
 *               category:
 *                 type: string
 *                 description: Category of the product (optional)
 *               price:
 *                 type: number
 *                 description: Price of the product (optional)
 *               sku:
 *                 type: string
 *                 description: SKU of the product (optional)
 *               stock_status:
 *                 type: string
 *                 enum: [in_stock, out_of_stock]
 *                 description: Stock status of the product (optional)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const data = await service.updateProduct(id, req.body);

    res.status(200).json(success(data, "Product updated successfully"));
  } catch (error) {
    next(error);
  }
}

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID (required)
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 */
export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const data = await service.deleteProduct(id);

    res.status(200).json(success(data, "Product deleted successfully"));
  } catch (error) {
    next(error);
  }
}
