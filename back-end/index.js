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

app.post("/checkout", async (req, res) => {
  const {
    order_date,
    total_amount,

    price,
    quantity,
    product_id,
    order_id,
  } = req.body;

  console.log("req.body", req.body);

  try {
    const response = await sql`
      INSERT INTO orders ( name, order_date, total_amount, customer_d)
      VALUES ( ${customer_id}, ${order_date}, ${total_amount}, '1')
      RETURNING *;

      `;

    // INSERT INTO order_items ( order_id, product_id, price)
    // VALUES ( ${order_id}, ${product_id}, ${quantity}, ${price})
    // RETURNING *;
    res.status(201).json(response);
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }

  try {
  } catch (error) {}
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
