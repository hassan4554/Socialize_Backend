require("module-alias/register");
require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const routes = require("./Routes");
const { passport } = require("@Configs/passport.config");
const { sequelize } = require("@Models");
const { globalErrorHandler } = require("@Middleware");
const { AppError } = require("@Utils");
const { swaggerSpec } = require("@Swagger");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static("uploads"));
app.use("/", routes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.all("*", (req, res, next) => {
  return next(new AppError("API not found", 404));
});

app.listen(3000, () => console.log("listening on port 3000"));
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully✅️");
    await sequelize.sync();
    console.log("Database synced successfully✅️");
  } catch (error) {
    console.log("Unable to connect to database❌");
    console.log(error);
  }
};

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION 💥", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION 💥", err);
  process.exit(1);
});

app.use(globalErrorHandler);
connectDB();
