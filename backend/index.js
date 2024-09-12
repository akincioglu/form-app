const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { poolPromise, sql } = require("./db");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/submit-form", async (req, res) => {
  const pool = await poolPromise;
  const { name, email } = req.body;
  try {
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .input("email", sql.VarChar, email)
      .query("INSERT INTO Users (Name, Email) VALUES (@name, @email)");
    res.send("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
