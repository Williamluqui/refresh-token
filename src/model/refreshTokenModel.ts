import { prisma } from "../database/database";

export class RefreshTokenModel {
  async getUser(userId: string) {
    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async saveRefreshToken(refreshToken: string, userId: string) {
    return await prisma.refreshToken.create({
      data: {
        refreshToken,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateRefreshToken(refreshToken: string, userId: string) {
    return await prisma.refreshToken.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async validateRefreshTokenUser(refreshToken: string) {
    return await prisma.refreshToken.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  async logoutUser(refreshToken: string) {
    return await prisma.refreshToken.deleteMany({
      where: {
        refreshToken,
      },
    });
  }
  async deleteRefreshTokenUserLogged(userId: string) {
    return await prisma.refreshToken.deleteMany({
      where: {
        userId,
      },
    });
  }
}
