import { Request, Response, NextFunction } from "express";
import { verifyRefreshToken } from "../jwt/jwtServices";

export async function ensureRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const refreshToken = req.headers.authorization;
  const token = refreshToken?.split(" ")[1];
  if (!refreshToken) {
    res
      .status(401)
      .json({ status: 401, error: true, message: "Refresh token inválido!" });
    return;
  }
  try {
    await verifyRefreshToken(token!);

    next();
  } catch (error) {
    console.log(`[ERRO] ${error}`);
    res.status(401).json({
      status: 401,
      error: true,
      message: "refresh Token inválido ou expirado!",
    });
  }
}
