import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@shauryadity/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

// MAIN ROUTER TO EXPORT
export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// ======================
// ✅ PUBLIC ROUTES
// ======================

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ posts });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
      select: {
        content: true,
        title: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ blog });
  } catch (e) {
    c.status(404);
    return c.text("Blog not found");
  }
});

// ======================
// ✅ AUTH MIDDLEWARE
// ======================

const protectedRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

protectedRoutes.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(401);
    return c.json({ error: "Unauthorized - Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = await verify(token, c.env.JWT_SECRET) as { id: string };
    if (!payload || !payload.id) {
      c.status(401);
      return c.json({ error: "Unauthorized - Invalid token payload" });
    }

    c.set("userId", payload.id);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({ error: "Unauthorized - Invalid token" });
  }
});

// ======================
// ✅ PROTECTED ROUTES
// ======================

protectedRoutes.post("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json(blog);
});

protectedRoutes.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Invalid input" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({ id: blog.id });
});

// Attach protected routes under / (so POST / and PUT /)
blogRouter.route("/", protectedRoutes);
