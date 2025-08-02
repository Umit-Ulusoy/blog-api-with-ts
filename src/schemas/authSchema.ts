import { z } from "zod";

export const registerUserSchema = {
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  }),
};

export const loginUserSchema = {
  body: z.object({
    emailOrUsername: z.string().min(3),
    password: z.string().min(8),
  }),
};

export type RegisterUserInput = z.infer<typeof registerUserSchema.body>;
export type LoginUserInput = z.infer<typeof loginUserSchema.body>;
