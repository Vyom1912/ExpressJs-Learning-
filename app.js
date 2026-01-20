// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import { PORT } from "./env.js";
import path from "path";

// this Is Comman JS
// console.log(__dirname);
// console.log(__filename);
//  this directory path and file name is not able to run in ES Module(We write: "Type":"module" in Pakage.json file)
// To Show These, Node.js 20.11.0+ version upfated with following
// console.log(import.meta.dirname);
// console.log(import.meta.filename);

// Solution for OlderVersion
// import path from "path";
// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);
// console.log({ __dirname, __filename });

const app = express();
// -------------------------------------------------------------------------------------------

// Basic Way to Show HTML Response using ExpressJS
// app.get("/", (req, res) => {
//   res.send(` <div class="container">
//       <h1>URL Shortener</h1>
//       <ul id="shortened-urls"></ul>
//     </div>`);
// });
// app.get("/about", (req, res) => {
//   return res.send(` <h1 style="color: #333; font-size: 24px;">
//         JavaScript Reference Example
//     </h1>
//     `);
// });
// -------------------------------------------------------------------------------------------

// About PORT Define and Configuration
// const PORT = 3000;
// if i use env.PORT=3000 in powershell then it takes as onject in globle environment
// and we does not have to define PORT no every time
// const PORT = process.env.PORT || 3000;
// -------------------------------------------------------------------------------------------
// 1. give direct PORT = 3000
// 2. set PORT in system by PowerShell ( $env:PORT=3001) or Terminal (set PORT=3002)
//    And FOr Remove in PowerShell (Remove-Item Env:PORT) or Terminal (set PORT=)
//    PUT this in Top of file
//    import dotenv from "dotenv";
//    dotenv.config();
// 3. Create .env file and just write PORT=3003 + Mention import code for dotenv
// 3.a. not mention import dotenv instead just write this code in pakage.json's scripts object
//    "dev": "node --env-file=./.env --watch app.js"

console.log("ENV PORT:", process.env.PORT);

// -------------------------------------------------------------------------------------------
// Absolute PATH
// we can fecth the folder and dependancies of indexhtml files like css, script and image
// it should be static website while using this to connect multiple file in single response
// const staticPath = path.join(import.meta.dirname, "public", "index.html");
const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));
// after these above line we dont need to write any app.get for home page
// it will automatically fetch index.html file from public folder
// -----
// if i wnat localhost://3001/public/ location than
// app.use("/public", express.static(staticPath));
// -----
// OR
// app.use(express.static("public")); // provide direct folder name and it will fetch all files inside that folder
// const homePagePath = path.join("public", "index.html");

// -------------------------------------------------------------------------------------------
// For Home Page Route Normally
// app.get("/", (req, res) => {
//  for importing File Path in express
// console.log(__dirname);
// console.log(__filename);
// console.log(import.meta.dirname);
// const __filename = new URL(import.meta.url).pathname;
// console.log(__filename);
// res.send("Hi")
// -------------------------------------------------------------------------------------------
// res.sendFile(staticPath);
// For Sending Whole HTML file as Response
// code is above in Absolute PATH
// res.sendFile(homePagePath);
// });
// -------------------------------------------------------------------------------------------
// FOR Dynamic URL Parameter and Slug Handling
// app.get("/profile/:username", (req, res) => {
//   console.log(req.params);
//   res.send(`Welcome to <b> ${req.params.username} </b> profile page`);
// });
// --------------------------------
// app.get("/profile/:username/article/:slug", (req, res) => {
//   console.log(req.params);

//   const formattedeSlug = req.params.slug.replace(/-/g, " "); // replacing - with space
//   res.send(
//     `Welcome to <b> ${req.params.username} </b> by <b> ${formattedeSlug} </b> profile page`
//   );
// });

// -------------------------------------------------------------------------------------------
// For Query Parameters Handling
// app.get("/product", (req, res) => {
// console.log(req.query);
// for Single Query Parameter
// res.send(`Product Page of <b> ${req.query.name} </b>`);
// http://localhost:3001/product?name=iphone
//  for multiple Query Parameters
// res.send(
//   `Product Page of <b> ${req.query.name} </b> and Price is <b> ${req.query.price} </b>`
// );
// http://localhost:3001/product?name=iphone&price=50000
// query parameters are visible in URL after ? and are key value pair separated by &.
// });

// -------------------------------------------------------------------------------------------
// form submission handling
// -------------------
// 1. Get Method Form Submission Handling
// app.get("/contect", (req, res) => {
// console.log(req.query);
// res.redirect("/");
// result will be redirect to home page after form submission and query parameters will be visible in URL
// http://localhost:3001/contect?name=John+Doe&message=Hello+there%21
// also in terminal we can see the object form of query parameters
// });
// -------------------
// 2. Post Method Form Submission Handling
// we have to use middleware before handling post request and we have to change app.get to app.post
app.use(express.urlencoded({ extended: true })); // to handle form data in post method and json data, we can use express.json() also for json data
// we can see the data in terminal
// {extended: true} means it can handle nested objects and arrays in form data
// -------------------

app.post("/contect", (req, res) => {
  console.log(req.body);
  res.redirect("/");
  // but currently it will show undefined because express does not know how to handle form data
  // we have to use middleware to handle form data
});

// -------------------------------------------------------------------------------------------
// For 404 - Page Not Found Handling
app.use((req, res) => {
  // return res.status(404).send("<h1>404 - Page Not Found</h1>");
  return res
    .status(404)
    .sendFile(path.join(import.meta.dirname, "views", "404.html"));
});

// -------------------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT} Port `);
});
