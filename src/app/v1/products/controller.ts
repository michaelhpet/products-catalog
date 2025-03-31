import { NextFunction, Request, Response } from "express";
import * as service from "./service";
import { success } from "../../../utils";
import { Pagination } from "../../../types";

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
