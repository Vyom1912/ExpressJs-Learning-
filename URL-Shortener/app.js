import express from "express";
// if use default export router in routes/shortener.routes.js
// import { Router } from "express";
// or 
// import * as shortenerRoutes from "./routes/shortener.routes.js";
import {shortenerRouter} from "./routes/shortener.routes.js";

export const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// express app use the router
// if use default export router in routes/shortener.routes.js
// app.use("/", router);
// or
app.use("/", shortenerRouter);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
