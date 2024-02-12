import * as z from "zod";


export const PostValidation = z.object({
    post: z.string().min(3, { message: "Minimum 3 characters." }),
    media: z.string().url().optional(),
    gif: z.string().url().optional(),
    emoji: z.string().optional(),
    accountId: z.string(),
  });
  
export const CommentValidation = z.object({
    post: z.string().min(3, { message: "Minimum 3 characters." }),
  });
  