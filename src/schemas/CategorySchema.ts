import { z } from "zod";

export const createCategorySchema = {
  body: z.object({
    name: z.string().min(2),
  }),
};

export const updateCategorySchema = {
  body: z.object({
    name: z.string().min(2),
  }),
};

export type CreateCategoryInput = z.infer<typeof createCategorySchema.body>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema.body>;
