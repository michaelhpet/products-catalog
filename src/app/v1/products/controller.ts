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

    const data = await service.getProducts({ limit, page });

    res.status(200).json(success(data, "Products retrieved successfully"));
  } catch (error) {
    next(error);
  }
}
