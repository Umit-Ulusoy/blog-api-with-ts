import { z } from "zod";

export const createPostSchema = {
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
};

export const updatePostSchema = {
  body: z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
  }),
};

export const getPostsQuerySchema = {
  query: z.object({
    title: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
};

export type CreatePostInput = z.infer<typeof createPostSchema.body>;
export type UpdatePostInput = z.infer<typeof updatePostSchema.body>;
export type GetPostsQueryInput = z.infer<typeof getPostsQuerySchema.query>;
