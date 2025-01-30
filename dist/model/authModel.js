"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const database_1 = require("../database/database");
class AuthModel {
    async registerUser(user) {
        const register = await database_1.prisma.user.create({
            data: {
                ...user,
            },
        });
        return register;
    }
    async userAlreadyExist(email) {
        const login = await database_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        return login;
    }
}
exports.AuthModel = AuthModel;
//# sourceMappingURL=authModel.js.map