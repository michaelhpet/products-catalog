import { randomUUID } from "crypto";
import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text().notNull(),
  description: text().notNull(),
  category: text().notNull(),
  price: real().notNull(),
  sku: text().notNull(),
  stock_status: text()
    .notNull()
    .$default(() => "out_of_stock"),
  created_at: text()
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updated_at: text()
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});
