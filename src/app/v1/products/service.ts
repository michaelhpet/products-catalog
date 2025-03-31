import { db } from "../../../db";
import { products } from "../../../db/schema";
import { getPagination } from "../../../utils";
import { Pagination } from "../../../types";

export async function getProducts(query: Pagination) {
  const { limit = 10, page = 1 } = query;
  const offset = (page - 1) * limit;

  const data = await db
    .select()
    .from(products)
    .orderBy(products.created_at)
    .limit(limit)
    .offset(offset);

  const totalRecords = await db.$count(products);

  return {
    products: data,
    pagination: getPagination({ limit, page }, data.length, totalRecords),
  };
}
