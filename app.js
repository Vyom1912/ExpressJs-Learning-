// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import { PORT } from "./env.js";

const app = express();

app.get("/", (req, res) => {
  res.send(` <div class="container">
      <h1>URL Shortener</h1>

      <form id="shorten-form">
        <div class="input-group">
          <input type="url" name="url" id="url" required placeholder=" " />
          <label for="url">Enter URL</label>
        </div>

        <div class="input-group">
          <input
            type="text"
            name="shortCode"
            id="shortCode"
            required
            placeholder=" " />
          <label for="shortCode">Enter Short Code</label>
        </div>

        <button type="submit">Shorten URL</button>
      </form>

      <h2>Shortened URLs</h2>
      <ul id="shortened-urls"></ul>
    </div>`);
});
app.get("/about", (req, res) => {
  return res.send(` <h1 style="color: #333; font-size: 24px;">
        JavaScript Reference Example
    </h1>
    <ul style="color: #444; font-size: 14px;">
        <li>Inline CSS is used</li>
        <li>Simple HTML structure</li>
        <li>Easy to access using JavaScript</li>
    </ul>`);
});

// const PORT = 3000;
// if i use env.PORT=3000 in powershell then it takes as onject in globle environment
// and we does not have to define PORT no every time
// const PORT = process.env.PORT || 3000;
console.log("ENV PORT:", process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT} Port `);
});

// 1. give direct PORT = 3000
// 2. set PORT in system by PowerShell ( $env:PORT=3001) or Terminal (set PORT=3002)
//    And FOr Remove in PowerShell (Remove-Item Env:PORT) or Terminal (set PORT=)
//    PUT this in Top of file
//    import dotenv from "dotenv";
//    dotenv.config();
// 3. Create .env file and just write PORT=3003 + Mention import code for dotenv
// 3.a. not mention import dotenv instead just write this code in pakage.json's scripts object
//    "dev": "node --env-file=./.env --watch app.js"
