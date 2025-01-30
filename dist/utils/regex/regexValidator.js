"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.validateName = exports.validateUserEmail = void 0;
exports.clearAndNormalizeName = clearAndNormalizeName;
const validateUserEmail = (email) => {
    if (!email)
        return true;
    const emailLowerCase = email.toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailLowerCase);
};
exports.validateUserEmail = validateUserEmail;
const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\-\s]+$/;
    return nameRegex.test(name);
};
exports.validateName = validateName;
const validatePassword = (input) => {
    const passwordRegex = /^\S{6,}$/;
    return passwordRegex.test(input);
};
exports.validatePassword = validatePassword;
function clearAndNormalizeName(nome) {
    nome = nome
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    nome = nome.toLowerCase();
    nome = nome.replace(/\s+/g, "-");
    nome = nome.replace(/[^\w\-]+/g, "");
    return nome;
}
//# sourceMappingURL=regexValidator.js.map