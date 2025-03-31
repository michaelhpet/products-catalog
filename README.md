# Products Catalog API

A RESTful API to manage a business’s product catalog, incorporating rate limiting to prevent abuse and ensure fair usage.

## Tech Stack

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building the API.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **SQLite**: Lightweight database for data storage.
- **Drizzle ORM**: Type-safe ORM for database interactions.
- **Celebrate**: Validation middleware for request validation.
- **Winston**: Logging library for structured logs.
- **Express Rate Limit**: Middleware for rate limiting API requests.
- **dotenv**: Environment variable management.

## Features

- CRUD operations for managing products.
- Pagination support for listing products.
- Input validation using `celebrate`.
- Rate limiting to prevent abuse.
- SQLite database with migrations managed by Drizzle ORM.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- yarn
- SQLite

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:michaelhpet/products-catalog.git
   cd products-catalog
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file by copying `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:

   ```env
   PORT=8000
   DB_FILE_NAME=file:local.db
   ```

5. Run database migrations:

   ```bash
   yarn migrate
   ```

---

## Running the Application

### Development Mode

Start the server in development mode with hot-reloading:

```bash
yarn dev
```

### Production Mode

Build and start the server:

```bash
yarn build
yarn start
```

The server will start on the port specified in the `.env` file (default: `8000`).

---

## API Documentation

### Base URL

```
http://localhost:<PORT>/api/v1
```

### Endpoints

#### 1. **Get All Products**

- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Number of items per page (default: 10)
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Products retrieved successfully",
    "data": [...],
    "meta": {
      "pagination": {
        "page": 1,
        "limit": 10,
        "total_pages": 5,
        "total_records": 50
      }
    }
  }
  ```

#### 2. **Get a Product by ID**

- **URL**: `/products/:id`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Product retrieved successfully",
    "data": { ... }
  }
  ```

#### 3. **Create a Product**

- **URL**: `/products`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product Description",
    "category": "Category",
    "price": 100.0,
    "sku": "SKU123",
    "stock_status": "in_stock"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Product created successfully",
    "data": { ... }
  }
  ```

#### 4. **Update a Product**

- **URL**: `/products/:id`
- **Method**: `PUT`
- **Body**:
  ```json
  {
    "name": "Updated Name",
    "price": 120.0
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Product updated successfully",
    "data": { ... }
  }
  ```

#### 5. **Delete a Product**

- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Product deleted successfully",
    "data": null
  }
  ```

---

## Rate Limiting

The API uses rate limiting to prevent abuse:

- **Limit**: 100 requests per minute per IP.
- **Response on exceeding limit**:
  ```json
  {
    "status": "fail",
    "message": "Too many requests from this IP, please try again after a minute",
    "data": null
  }
  ```

---

## Testing

Run tests using Mocha:

```bash
yarn test
```

---

## License

This project is licensed under the [MIT License](LICENSE).
