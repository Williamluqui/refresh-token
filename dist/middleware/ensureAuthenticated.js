"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const jwtServices_1 = require("../jwt/jwtServices");
async function ensureAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    const token = authToken?.split(" ")[1];
    if (!authToken) {
        res
            .status(401)
            .json({ status: 401, error: true, message: "Usuário não autorizado!" });
        return;
    }
    try {
        await (0, jwtServices_1.verifyToken)(token);
        next();
    }
    catch (error) {
        console.log(`[ERRO] ${error}`);
        res.status(401).json({
            status: 401,
            error: true,
            message: "Token inválido ou expirado, tente novamente!",
        });
    }
}
//# sourceMappingURL=ensureAuthenticated.js.map