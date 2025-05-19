import { z } from "zod";

export const createUserSchema = {
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
  }),
};

export const updateUserSchema = {
  body: z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
  }),
};

export const getUsersQuerySchema = {
  query: z.object({
    username: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
};

export type CreateUserInput = z.infer<typeof createUserSchema.body>;
export type UpdateUserInput = z.infer<typeof updateUserSchema.body>;
export type GetUsersQueryInput = z.infer<typeof getUsersQuerySchema.query>;
