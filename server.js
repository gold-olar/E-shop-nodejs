const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();
require("./config/db");

const port = process.env.PORT;

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/user", require("./route/user"));
app.use("/api/admin", require("./route/admin"));
app.use("/api/category", require("./route/category"));
app.use("/api/product", require("./route/product"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("public/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`server is running on port ${port}`));
