import { MongoClient } from "mongodb";
import { env } from "./env.js";

export const dbClient = new MongoClient(env.MONGODB_URI);

export const db = dbClient.db(env.MONGODB_DATABASE_NAME);
