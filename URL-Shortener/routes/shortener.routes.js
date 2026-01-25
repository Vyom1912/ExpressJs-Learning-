import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";
import { Router } from "express";

const router=Router();

const DATA_FILE = path.join("data", "links.json");


const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data || "{}");
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links), "utf-8");
};


// for report page, template engine ejs
router.get("/report", async (req, res) => {
    // dynamically render report.ejs with name variable
const students = [
  {
    name: "Vyom Patel",
    grade: "10th",
    subject: "Maths",
    marks: 92
  },
  {
    name: "Aarav Shah",
    grade: "10th",
    subject: "Science",
    marks: 88
  },
  {
    name: "Isha Mehta",
    grade: "9th",
    subject: "English",
    marks: 90
  },
  {
    name: "Rohan Verma",
    grade: "10th",
    subject: "Social Studies",
    marks: 85
  },
  {
    name: "Neha Singh",
    grade: "9th",
    subject: "Maths",
    marks: 95
  }
];


//   res.render("report", { student }); // for single student object
  res.render("report", { students }); // for multiple student object array
});

router.get("/", async (req, res) => {
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
});

router.post("/", async (req, res) => {
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
});

router.post("/:shorten", async (req, res) => {
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
});
// small project
// export default router;

// Name export for bigger project
// const shortenerRouter=router;
// export default shortenerRouter;
// or
export const shortenerRouter=router;
