require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userController = require("./controllers/usersController");
const adminRoute = require("./Routes/adminRoute");
const orderRoute = require("./Routes/ordersRoute");
const productRoute = require("./Routes/productRoute");
const { PORT } = process.env;
// const { sequelize } = require("./models");
const errorMiddleware = require("./middlewares/error");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/register", userController.register);
app.use("/login", userController.login);
app.use("/admin/", adminRoute);
app.use("/order/", orderRoute);
app.use("/products", productRoute);
app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

// sequelize.sync({ force: true }).then(() => console.log("DB Sync"));
app.listen(PORT, () => {
  console.log("Server is running in " + PORT);
});
