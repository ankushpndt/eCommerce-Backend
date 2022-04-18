const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");;

const initializeDBConnection = require("./db/db.connection");
const productsRouter = require("./routers/products.router");
const userRouter = require("./routers/users.router");
const cartRouter = require("./routers/cart.router");
const wishlistRouter = require("./routers/wishlist.router");
const addressRouter = require("./routers/address.router")
const paymentRouter = require("./routers/stripe.router")
const reviewRouter = require("./routers/review.router")
initializeDBConnection();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productsRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/address", addressRouter)
app.use("/payment",paymentRouter)
app.use("/review",reviewRouter)
app.get("/", (req, res) => {

  res.send("Ecommerce Backend");
});

app.use("*", function (req, res) {
  res.status(400).json("Page Not Found");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started at",PORT);
});