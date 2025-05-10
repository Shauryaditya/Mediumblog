import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

//type inference in zod
export type signupInputType = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type signinInputType = z.infer<typeof signinInput>;

export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  mainImageUrl: z.string().url().optional(), // ✅ Add this line
});

export type createBlogInputType = z.infer<typeof createBlogInput>;

export const updateBlogInput = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  id: z.string(),
});

export type updateBlogInputType = z.infer<typeof updateBlogInput>;
