"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    statusCode;
    message;
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode || 500;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const handleError = (err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        error: {
            status: "error",
            statusCode,
            message,
        },
    });
};
exports.handleError = handleError;
//# sourceMappingURL=errorAplication.js.map