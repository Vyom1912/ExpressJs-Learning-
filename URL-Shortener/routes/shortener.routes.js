import { Router } from "express";
import {
  postURLShortner,
  getURLShortner,
  redirectToShortCode,
} from "../controllers/postshortner.controller.js";
const router = Router();

// for report page, template engine ejs
// router.get("/report", async (req, res) => {
//   // dynamically render report.ejs with name variable
//   const students = [
//     {
//       name: "Vyom Patel",
//       grade: "10th",
//       subject: "Maths",
//     },
//     {
//       name: "Aarav Shah",
//       grade: "10th",
//       subject: "Science",
//     },
//     {
//       name: "Isha Mehta",
//       grade: "9th",
//       subject: "English",
//     },
//     {
//       name: "Rohan Verma",
//       grade: "10th",
//       subject: "Social Studies",
//     },
//     {
//       name: "Neha Singh",
//       grade: "9th",
//       subject: "Maths",
//     },
//   ];

//   //   res.render("report", { student }); // for single student object
//   res.render("report", { students }); // for multiple student object array
// });

router.get("/", getURLShortner);

router.post("/", postURLShortner);

router.get("/:shortCode", redirectToShortCode);
// small project
// export default router;

// Name export for bigger project
// const shortenerRouter=router;
// export default shortenerRouter;
// or
export const shortenerRouter = router;
