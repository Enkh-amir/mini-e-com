require("dotenv").config();

const express = require("express");
const { neon } = require("@neondatabase/serverless");

const app = express();
const PORT = process.env.PORT || 4242;

// Connect to the database
const sql = neon(`${process.env.DATABASE_URL}`);

app.get("/", async (_, res) => {
  try {
    const response = await sql`SELECT * FROM products`;
    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
