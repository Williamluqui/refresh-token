export const validateUserEmail = (email: string): boolean => {
  if (!email) return true;

  const emailLowerCase = email.toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(emailLowerCase);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\-\s]+$/;

  return nameRegex.test(name);
};

export const validatePassword = (input: string): boolean => {
  const passwordRegex = /^\S{6,}$/;

  return passwordRegex.test(input);
};

export function clearAndNormalizeName(nome: string) {
  nome = nome
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  nome = nome.toLowerCase();
  nome = nome.replace(/\s+/g, "-");
  nome = nome.replace(/[^\w\-]+/g, "");

  return nome;
}
