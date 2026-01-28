// import { readFile, writeFile } from "fs/promises";
// import path from "path";

// // const DATA_FILE = path.join("data", "links.json");

// export const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     return JSON.parse(data || "{}");
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw error;
//   }
// };

// export const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links), "utf-8");
// };

import { db } from "../config/db-client.js";
import { env } from "../config/env.js";

// const db = dbClient.db(env.MONGODB_DATABASE_NAME);

const shortenerCollection = db.collection("urls");

// export const loadLinks = async () => {
//   return await shortenerCollection.find().toArray();
// };
export const loadLinks = async () => {
  // return await collection.find().toArray();
  const docs = await shortenerCollection.find().toArray();

  return docs.reduce((acc, doc) => {
    acc[doc.shortCode] = doc.url;
    return acc;
  }, {});
};

export const saveLinks = async ({ shortCode, url }) => {
  return await shortenerCollection.insertOne({ shortCode, url });
};

export const getLinkByShortCode = async (shortCode) => {
  return await shortenerCollection.findOne({ shortCode: shortCode });
};
