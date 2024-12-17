import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  (req as any).user = { id: decoded.id };

  next();
};

export const generateToken = (
  userId: string,
  expiresIn: string = "15m"
): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
};

export const refreshToken = (
  token: string,
  expiresIn: string = "15m"
): string | null => {
  try {
    const decoded = verifyToken(token);

    if (!decoded) return null;

    return generateToken(decoded.id, expiresIn);
  } catch (error) {
    return null;
  }
};
