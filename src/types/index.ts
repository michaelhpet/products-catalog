export type Pagination = {
  page: number;
  limit: number;
};

export type Product = {
  name: string;
  description: string;
  category: string;
  price: number;
  sku: string;
  stock_status: string;
};
