"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
exports.verifyRefreshToken = verifyRefreshToken;
exports.verifyAndClearToken = verifyAndClearToken;
exports.verifyAndClearRefreshToken = verifyAndClearRefreshToken;
exports.GenerateRefreshToken = GenerateRefreshToken;
const jwt = __importStar(require("jsonwebtoken"));
const { SECRET_TOKEN, JTW_EXPIRE_IN, JWT_REFRESH_SECRET } = process.env;
function generateToken(userPayload) {
    const payload = {
        id: userPayload.id,
        role: userPayload.role,
        email: userPayload.email,
    };
    return jwt.sign(payload, SECRET_TOKEN, { expiresIn: JTW_EXPIRE_IN });
}
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
function verifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
}
async function verifyAndClearToken(token) {
    if (!token)
        throw new Error("Erro ao obter o token!");
    const tokenClear = token.split("Bearer ")[1];
    const tokenInfo = await verifyToken(tokenClear);
    return tokenInfo;
}
async function verifyAndClearRefreshToken(token) {
    if (!token)
        throw new Error("Erro ao obter o token!");
    const tokenClear = token.split("Bearer ")[1];
    const tokenInfo = await verifyRefreshToken(tokenClear);
    return tokenInfo;
}
async function GenerateRefreshToken(userId) {
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
        algorithm: "HS256",
    });
    return refreshToken;
}
//# sourceMappingURL=jwtServices.js.map