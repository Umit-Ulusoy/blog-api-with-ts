import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

export const getUsersQuerySchema = z.object({
  username: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUsersQueryInput = z.infer<typeof getUsersQuerySchema>;
