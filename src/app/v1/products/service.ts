import { db } from "../../../db";
import { products } from "../../../db/schema";
import { AppError, getPagination } from "../../../utils";
import { Pagination, Product } from "../../../types";
import { eq } from "drizzle-orm";

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

export async function getProduct(id: string) {
  const [data] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (!data) throw new AppError(404, "Product not found");

  return data;
}

export async function createProduct(product: any) {
  const [data] = await db.insert(products).values(product).returning();

  if (!data) throw new AppError(500, "Could not create product");

  return data;
}

export async function updateProduct(id: string, product: Product) {
  if (!Object.keys(product).length)
    throw new AppError(400, "No data provided to update");

  const [data] = await db
    .update(products)
    .set({ ...product, updated_at: new Date().toISOString() })
    .where(eq(products.id, id))
    .returning();

  if (!data) throw new AppError(404, "Product not found");

  return data;
}

export async function deleteProduct(id: string) {
  const [data] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  if (!data) throw new AppError(404, "Product not found");

  return null;
}
