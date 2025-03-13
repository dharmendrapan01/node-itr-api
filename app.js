require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./api/users/user.router");
const sourceRouter = require("./api/soi/soi.router");
const serviceRouter = require("./api/services/services.router");

// Middleware to parse JSON requests
app.use(express.json());

// Use multiple routers
app.use("/api/users", userRouter);
app.use("/api/soi", sourceRouter);
app.use("/api/services", serviceRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port : ", process.env.APP_PORT);
});