// middlewares/auth.ts
import { MiddlewareHandler } from 'hono'

export const verifyToken: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.text('Unauthorized: No token provided', 401)
  }

  const token = authHeader.split(' ')[1]

  // Replace with your token validation logic
  if (token !== c.env.JWT_SECRET) {
    return c.text('Unauthorized: Invalid token', 401)
  }

  // Optionally, set user context here: c.set("user", decodedData)
  await next()
}
