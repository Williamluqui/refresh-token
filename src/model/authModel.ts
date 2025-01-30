import { prisma } from "../database/database";
interface Register {
  name: string;
  email: string;
  password: string;
}
export class AuthModel {
  async registerUser(user: Register) {
    const register = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return register;
  }

  async userAlreadyExist(email: string) {
    const login = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return login;
  }
}
