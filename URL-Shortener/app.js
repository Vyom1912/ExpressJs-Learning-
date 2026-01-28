import dotenv from "dotenv";
dotenv.config();

import express from "express";
// if use default export router in routes/shortener.routes.js
// import { Router } from "express";
// or
// import * as shortenerRoutes from "./routes/shortener.routes.js";
import { shortenerRouter } from "./routes/shortener.routes.js";
import { dbClient } from "./config/db-client.js";

await dbClient.connect();
console.log("Connected to MongoDB");

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// express app use the router
// if use default export router in routes/shortener.routes.js
// app.use("/", router);
// or
app.use("/", shortenerRouter);
// view engine setup
app.set("view engine", "ejs");
// routes
app.set("views", "./views"); // it is default value so not necessary to write
// app.use("/", shortener.routes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
