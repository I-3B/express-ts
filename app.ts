require("dotenv").config();
require("express-async-errors");
if (process.env.NODE_ENV === "development") require("./src/configs/mongoConfigDevelopment");
else if (process.env.NODE_ENV === "production") require("./src/configs/mongoConfigProduction");

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import APIRouter from "./src/routes/APIRouter";
import authenticateRoute from "./src/utils/authenticateRoute";
const app: Application = express();
const port = process.env.PORT || 8080;

const db = mongoose.connection;
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "build")));

app.use("/api", authenticateRoute, APIRouter);
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use((req, res, next) => {
    next(createError(404));
});
app.use((err: { message: any; status: any }, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.json(err);
});
if (process.env.NODE_ENV != "test") {
    try {
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
            // if (process.env.NODE_ENV === "development") populateDB();
        });
    } catch (error: any) {
        console.error(`Error occurred: ${error.message}`);
    }
}
export default app;
