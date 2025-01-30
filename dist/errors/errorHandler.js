"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerCatch = errorHandlerCatch;
function errorHandlerCatch(error) {
    let statusCode = 500;
    let message = "Algum erro ocorreu.Contate o Suporte.";
    if (error instanceof Error) {
        statusCode = error.statusCode || statusCode;
        message = error.message.includes("prisma")
            ? "Erro critico ao salvar ou buscar no Banco de dados!"
            : error.message || message;
    }
    return { statusCode, message };
}
//# sourceMappingURL=errorHandler.js.map