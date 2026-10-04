const express = require("express");
const path = require("node:path");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};

  // Reject missing fields and unexpected data types.
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.trim() === "" ||
    password === ""
  ) {
    return res.status(400).json({
      message: "Email and password are required and must be text."
    });
  }

  if (!email.trim().includes("@")) {
    return res.status(400).json({
      message: "Email must contain @."
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters."
    });
  }

  return res.json({
    message: "Validation passed. This demo does not authenticate users."
  });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Open http://127.0.0.1:3000");
});