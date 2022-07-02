const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./models/db");
const { errorHandler } = require("./errorMiddleware/ErrorHandler");
const { notFound } = require("./errorMiddleware/NotFound");
const TodoRoute = require("./routes/TodoRoute");

const app = express();

dotenv.config();

app.use(express.json());

connectDB();

app.use("/todo", TodoRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
    )
);