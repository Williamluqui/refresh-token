import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt/jwtServices";

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authToken = req.headers.authorization;
  const token = authToken?.split(" ")[1];
  if (!authToken) {
    res
      .status(401)
      .json({ status: 401, error: true, message: "Usuário não autorizado!" });
    return;
  }
  try {
    await verifyToken(token!);

    next();
  } catch (error) {
    console.log(`[ERRO] ${error}`);
    res.status(401).json({
      status: 401,
      error: true,
      message: "Token inválido ou expirado, tente novamente!",
    });
  }
}
