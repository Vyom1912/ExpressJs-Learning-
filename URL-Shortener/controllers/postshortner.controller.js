import crypto from "crypto";
import path from "path";
import { readFile } from "fs/promises";
import { loadLinks, saveLinks } from "../models/shortener.model.js";

export const getURLShortner = async (req, res) => {
  try {
    const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks();

    const list = Object.entries(links)
      .map(
        ([shortCode, url]) =>
          `<li><a href="/${shortCode}" target="_blank">${req.host}</a> - ${url}</li>`,
      )
      .join("");
    res.send(file.toString().replaceAll("{{shortened_urls}}", list));
    // ----------- OR ----------- for replacing in  url list dynamically
    // const content = file.toString().replaceAll(
    //   "{{shortened_urls}}",
    //   Object.entries(links)
    //     .map(
    //       ([shortCode, url]) =>
    //         `<li><a href="/${shortCode}" target="_blank">${req.host}</a> - ${url}</li>`,
    //     )
    //     .join(""),
    // );
    // return res.send(content);
  } catch (error) {
    console.log(error);
    return res.status(500).send(" get Internal Server Error");
  }
};

export const postURLShortner = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }
    links[finalShortCode] = url;
    await saveLinks(links);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("post Internal Server Error");
  }
};

export const redirectToShortCode = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();
    if (!links[shortCode]) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
