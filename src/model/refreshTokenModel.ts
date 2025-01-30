import { prisma } from "../database/database";

export class RefreshTokenModel {
  async getUser(userId: string) {
    const refreshToken = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    return refreshToken;
  }

  async saveRefreshToken(refreshToken: string, userId: string) {
    const userRefreshToken = await prisma.refreshToken.create({
      data: {
        refreshToken,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return userRefreshToken;
  }

  async updateRefreshToken(refreshToken: string, userId: string) {
    const update = await prisma.refreshToken.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken,
      },
    });
    return update;
  }

  async logoutUser(refreshToken: string, userId: string) {
    const updateUser = await prisma.refreshToken.deleteMany({
      where: {
        userId,
        AND: {
          refreshToken,
        },
      },
    });
    return updateUser;
  }
}
