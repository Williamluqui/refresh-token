"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureRefreshToken = ensureRefreshToken;
const jwtServices_1 = require("../jwt/jwtServices");
async function ensureRefreshToken(req, res, next) {
    const refreshToken = req.headers.authorization;
    const token = refreshToken?.split(" ")[1];
    if (!refreshToken) {
        res
            .status(401)
            .json({ status: 401, error: true, message: "Refresh token inválido!" });
        return;
    }
    try {
        await (0, jwtServices_1.verifyRefreshToken)(token);
        next();
    }
    catch (error) {
        console.log(`[ERRO] ${error}`);
        res.status(401).json({
            status: 401,
            error: true,
            message: "refresh Token inválido ou expirado!",
        });
    }
}
//# sourceMappingURL=ensureRefreshToken.js.map