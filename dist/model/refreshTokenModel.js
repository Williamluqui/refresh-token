"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const database_1 = require("../database/database");
class RefreshTokenModel {
    async getUser(userId) {
        const refreshToken = await database_1.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        return refreshToken;
    }
    async saveRefreshToken(refreshToken, userId) {
        const userRefreshToken = await database_1.prisma.refreshToken.create({
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
    async updateRefreshToken(refreshToken, userId) {
        const update = await database_1.prisma.refreshToken.update({
            where: {
                userId: userId,
            },
            data: {
                refreshToken,
            },
        });
        return update;
    }
    async logoutUser(refreshToken, userId) {
        const updateUser = await database_1.prisma.refreshToken.deleteMany({
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
exports.RefreshTokenModel = RefreshTokenModel;
//# sourceMappingURL=refreshTokenModel.js.map