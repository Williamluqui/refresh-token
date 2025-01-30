"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const authModel_1 = require("../model/authModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtServices_1 = require("../jwt/jwtServices");
const errorAplication_1 = require("../errors/errorAplication");
const errorHandler_1 = require("../errors/errorHandler");
const regexValidator_1 = require("../utils/regex/regexValidator");
const refreshTokenModel_1 = require("../model/refreshTokenModel");
const SALT_HASH = 9;
class AuthController {
    async registerUser(req, res, next) {
        const userBody = req.body;
        try {
            if (!(0, regexValidator_1.validateUserEmail)(userBody.email))
                throw new errorAplication_1.ErrorHandler(400, "Email enviado inválido!");
            if (!(0, regexValidator_1.validatePassword)(userBody.password))
                throw new errorAplication_1.ErrorHandler(400, "O password deve conter mais de 6 caracteres!");
            if (!(0, regexValidator_1.validateName)(userBody.name))
                throw new errorAplication_1.ErrorHandler(400, "Nome não pode conter caracteres!");
            const authModel = new authModel_1.AuthModel();
            const user = await authModel.userAlreadyExist(userBody.email);
            if (user)
                throw new errorAplication_1.ErrorHandler(422, "Usuário já cadastrado!");
            userBody.password = await bcrypt_1.default.hash(userBody.password, SALT_HASH);
            const registerUser = await authModel.registerUser(userBody);
            if (!registerUser)
                throw new errorAplication_1.ErrorHandler(400, "Erro ao registrar usuario.");
            const dataUser = {
                id: registerUser.id,
                email: registerUser.email,
                name: registerUser.name,
            };
            res.status(200).json({
                status: 200,
                error: false,
                message: "Usuário registrado com sucesso!",
                data: dataUser,
            });
        }
        catch (error) {
            console.log(error);
            const { statusCode, message } = (0, errorHandler_1.errorHandlerCatch)(error);
            next(new errorAplication_1.ErrorHandler(statusCode, message));
        }
    }
    async authLogin(req, res, next) {
        const { email, password } = req.body;
        try {
            const authModel = new authModel_1.AuthModel();
            const verifyUser = await authModel.userAlreadyExist(email);
            if (!verifyUser)
                throw new errorAplication_1.ErrorHandler(400, "Email ou senha inválido!");
            console.log(verifyUser);
            const validPassword = await bcrypt_1.default.compare(password, verifyUser.password);
            if (!validPassword)
                throw new errorAplication_1.ErrorHandler(400, "Email ou senha inválido!");
            const generateRefreshToken = await (0, jwtServices_1.GenerateRefreshToken)(verifyUser.id);
            const tokenJwt = (0, jwtServices_1.generateToken)({
                id: verifyUser.id,
                email: verifyUser.email,
                role: "admin",
            });
            const refreshTokenModel = new refreshTokenModel_1.RefreshTokenModel();
            const refreshToken = await refreshTokenModel.saveRefreshToken(generateRefreshToken, verifyUser.id);
            if (!refreshToken)
                throw new errorAplication_1.ErrorHandler(400, "Erro ao salvar o refresh token!");
            res.status(200).json({
                status: 200,
                error: false,
                data: { accessToken: tokenJwt, refreshToken: generateRefreshToken },
            });
        }
        catch (error) {
            console.log(error);
            const { statusCode, message } = (0, errorHandler_1.errorHandlerCatch)(error);
            next(new errorAplication_1.ErrorHandler(statusCode, message));
        }
    }
    async refreshTokenUser(req, res, next) {
        const refreshAuth = req.headers.authorization;
        const refreshTokenModel = new refreshTokenModel_1.RefreshTokenModel();
        const verifyRefreshToken = await (0, jwtServices_1.verifyAndClearRefreshToken)(refreshAuth);
        if (!verifyRefreshToken)
            throw new errorAplication_1.ErrorHandler(401, "Refresh token inválido!");
        const generateRefreshToken = await (0, jwtServices_1.GenerateRefreshToken)(verifyRefreshToken.id);
        const getUser = await refreshTokenModel.getUser(verifyRefreshToken.id);
        if (!getUser)
            throw new errorAplication_1.ErrorHandler(400, "Erro ao buscar os dados do refresh token!");
        const tokenJwt = (0, jwtServices_1.generateToken)({
            id: getUser.id,
            email: getUser.email,
            role: "admin",
        });
        console.log(generateRefreshToken);
        const refreshToken = await refreshTokenModel.updateRefreshToken(generateRefreshToken, getUser.id);
        if (!refreshToken)
            throw new errorAplication_1.ErrorHandler(400, "Erro ao salvar o refresh token!");
        res.status(200).json({
            status: 200,
            error: false,
            data: { accessToken: tokenJwt, refreshToken: generateRefreshToken },
        });
    }
    async logoutUser(req, res, next) {
        const refreshAuth = req.headers.authorization;
        const tokenClear = refreshAuth?.split("Bearer ")[1];
        const refreshToken = await (0, jwtServices_1.verifyAndClearRefreshToken)(refreshAuth);
        const refreshTokenModel = new refreshTokenModel_1.RefreshTokenModel();
        try {
            const logoutUser = await refreshTokenModel.logoutUser(tokenClear, refreshToken.id);
            if (logoutUser.count <= 0)
                throw new errorAplication_1.ErrorHandler(401, "Refresh token inválido ou já deslogado!");
            res.status(200).json({
                status: 200,
                error: false,
                message: "Usuário deslogado com sucesso!",
            });
        }
        catch (error) {
            const { statusCode, message } = (0, errorHandler_1.errorHandlerCatch)(error);
            next(new errorAplication_1.ErrorHandler(statusCode, message));
        }
    }
    async routeTest(req, res, next) {
        res.status(200).json("user logged");
    }
}
module.exports = new AuthController();
//# sourceMappingURL=authController.js.map