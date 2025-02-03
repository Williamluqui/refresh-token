import * as jwt from "jsonwebtoken";
const { SECRET_TOKEN, JTW_EXPIRE_IN, JWT_REFRESH_SECRET } = process.env;

export interface IAdminToken {
  id: string;
  email: string;
  role: string;
}
interface RefreshToken {
  id: string;
}
export function generateToken(userPayload: IAdminToken) {
  const payload: IAdminToken = {
    id: userPayload.id,
    role: userPayload.role,
    email: userPayload.email,
  };
  return jwt.sign(payload, SECRET_TOKEN!, { expiresIn: JTW_EXPIRE_IN });
}

export function verifyToken(token: string): Promise<IAdminToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_TOKEN!, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as IAdminToken);
      }
    });
  });
}

export function verifyRefreshToken(token: string): Promise<RefreshToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_REFRESH_SECRET!, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as IAdminToken);
      }
    });
  });
}

export async function verifyAndClearToken(token: string | undefined) {
  if (!token) throw new Error("Erro ao obter o token!");

  const tokenClear = token.split("Bearer ")[1];
  const tokenInfo = await verifyToken(tokenClear);
  return tokenInfo;
}

export async function verifyAndClearRefreshToken(token: string | undefined) {
  if (!token) throw new Error("Erro ao obter o token!");

  const tokenInfo = await verifyRefreshToken(token);
  return tokenInfo;
}

export async function GenerateRefreshToken(userId: string) {
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "30d",
      algorithm: "HS256",
    }
  );
  return refreshToken;
}
