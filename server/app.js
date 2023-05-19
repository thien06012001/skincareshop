const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ErrorHandler = require("./middleware/error");
const path = require("path");
const cors = require("cors");
app.use(cors({
  origin: 'https://skincareshop.vercel.app',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", express.static(path.join(__dirname,"./uploads")));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
      path: "config/.env",
    });
}
// import routes
const user = require("./controller/user");
const product = require("./controller/product");
const payment = require("./controller/payment");
const order = require("./controller/order");
app.use("/api/v2/order", order);
app.use("/api/v2/payment", payment);
app.use("/api/v2/product", product);
app.use("/api/v2/user", user);
// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;