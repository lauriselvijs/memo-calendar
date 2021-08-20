const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const memos = require("./models/Memo");
const errors = require("./models/Error");

const app = express();

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home Page
app.get("/", (req, res) =>
  res.render("index", {
    title: "Memo Calendar",
    memos,
    errors,
  })
);

// Memos API Routes
app.use("/api/memos", require("./routes/api/memos"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
