// export const PORT = isNaN(process.env.PORT) ? 3000 : parseInt(process.env.PORT);
import { z, ZodError } from "zod";

const portSchema = z.coerce.number().min(1).max(65000);
export const PORT = portSchema.parse(process.env.PORT) || 3000;

// example
// const ageSchema = z.number().min(18).max(100).int();
// const userAge = 20;
// try {
//   const parseUserAge = ageSchema.parse(userAge);
//   console.log(parseUserAge); // sucess case
// } catch (error) {
//   //  instance is javaScript operator used to check if an object is an instance of specific class or constuctor
//   if (error instanceof ZodError) {
//     console.log(error.issues[0].message);
//   } else {
//     console.log("Unexpected error: ", error);
//   }
// }
// OR
// const { data, error, success } = ageSchema.safeParse(userAge);
// console.log(data, success, error);
