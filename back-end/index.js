require("dotenv").config();
const express = require("express");
const { neon } = require("@neondatabase/serverless");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4242;

app.use(cors());
app.use(express.json());

const sql = neon(`${process.env.DATABASE_URL}`);

app.get("/products", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM products`;
    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/checkout", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM orders`;
    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/order_items", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM order_items`;
    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/checkout", async (req, res) => {
  const { order_date, total_amount, items } = req.body;

  // Manually define the customer_id
  const customer_id = 2; // Replace this with the actual customer ID you want to use

  console.log("req.body", req.body);

  try {
    // Insert into orders
    const orderResponse = await sql`
      INSERT INTO orders (customer_id, order_date, total_amount)
      VALUES (${customer_id}, ${order_date}, ${total_amount})
      RETURNING id;
    `;

    const order_id = orderResponse[0].id; // Capture the order ID
    // Prepare and execute order items insertions
    const orderItemsQueries = items.map((item) => {
      const { product_id, quantity, price } = item; // Destructure item details
      return sql`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (${order_id}, ${product_id}, ${quantity}, ${price});
      `;
    });

    // Execute all order item insertions in parallel
    await Promise.all(orderItemsQueries);

    res.status(201).json({ order_id });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.post("/products", async (req, res) => {
  const { name, description, price, image_url } = req.body;

  if (!name || !description || !price || !image_url) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number." });
  }

  try {
    const response = await sql`
      INSERT INTO products ( name, description, price, image_url)
      VALUES ( ${name}, ${description}, ${price}, ${image_url})
      RETURNING *;`;

    res.status(201).json(response);
  } catch (error) {
    console.error("Error adding product:", error);
    if (error.code === "23505") {
      // PostgreSQL unique violation code
      return res
        .status(409)
        .json({ error: "Product with this ID already exists." });
    }
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
