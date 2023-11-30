import { z } from "zod";
import { isCanadianNumber } from "./isCanadianNumber";
import axios from "axios";

export const schema = z.object({
  firstName: z
    .string()
    .max(50)
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .max(50)
    .min(2, { message: "Last name must be at least 2 characters" }),
  phoneNumber: z.string().refine((value) => isCanadianNumber(value), {
    message: "Invalid Phone Number",
  }),
  corpNumber: z
    .string()
    .length(9, {
      message: "Invalid corporation number",
    })
    .refine(
      async (value) => {
        try {
          const response = await axios.get(
            `https://vault-test-task-api.onrender.com/corporationNumber/${value}`
          );
          return response.data.valid;
        } catch (error) {
          return false;
        }
      },
      {
        message: "Invalid corporation number",
      }
    ),
});
