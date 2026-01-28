import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    MONGODB_URI: z.string().min(1),
    MONGODB_DATABASE_NAME: z.string().min(1),
  })
  .parse(process.env);
