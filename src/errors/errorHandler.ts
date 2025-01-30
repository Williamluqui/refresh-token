export function errorHandlerCatch(error: unknown) {
  let statusCode = 500;
  let message = "Algum erro ocorreu.Contate o Suporte.";

  if (error instanceof Error) {
    statusCode = (error as any).statusCode || statusCode;
    message = error.message.includes("prisma")
      ? "Erro critico ao salvar ou buscar no Banco de dados!"
      : error.message || message;
  }
  return { statusCode, message };
}
