import { Request, Response, NextFunction } from "express";
import { AuthModel } from "../model/authModel";

import Bcrypt from "bcrypt";
import {
  GenerateRefreshToken,
  generateToken,
  verifyAndClearRefreshToken,
  verifyAndClearToken,
} from "../jwt/jwtServices";
import { ErrorHandler } from "../errors/errorAplication";
import { errorHandlerCatch } from "../errors/errorHandler";
import {
  validateName,
  validatePassword,
  validateUserEmail,
} from "../utils/regex/regexValidator";
import { RefreshTokenModel } from "../model/refreshTokenModel";

interface Login {
  name: string;
  email: string;
  password: string;
}

const SALT_HASH = 9;
class AuthController {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    const userBody: Login = req.body;
    try {
      if (!validateUserEmail(userBody.email))
        throw new ErrorHandler(400, "Email enviado inválido!");
      if (!validatePassword(userBody.password))
        throw new ErrorHandler(400, "O password deve conter mais de 6 caracteres!");
      if (!validateName(userBody.name))
        throw new ErrorHandler(400, "Nome não pode conter caracteres!");
      const authModel = new AuthModel();

      const user = await authModel.userAlreadyExist(userBody.email);
      if (user) throw new ErrorHandler(422, "Usuário já cadastrado!");

      userBody.password = await Bcrypt.hash(userBody.password, SALT_HASH);
      const registerUser = await authModel.registerUser(userBody);

      if (!registerUser) throw new ErrorHandler(400, "Erro ao registrar usuario.");
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
    } catch (error) {
      console.log(error);
      const { statusCode, message } = errorHandlerCatch(error);
      next(new ErrorHandler(statusCode, message));
    }
  }

  async authLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const authModel = new AuthModel();

      const verifyUser = await authModel.userAlreadyExist(email);
      if (!verifyUser) throw new ErrorHandler(400, "Email ou senha inválido!");
      console.log(verifyUser);

      const validPassword = await Bcrypt.compare(password, verifyUser.password);
      if (!validPassword) throw new ErrorHandler(400, "Email ou senha inválido!");
      const generateRefreshToken = await GenerateRefreshToken(verifyUser.id);

      const tokenJwt = generateToken({
        id: verifyUser.id,
        email: verifyUser.email,
        role: "admin",
      });

      const refreshTokenModel = new RefreshTokenModel();

      
      const refreshToken = await refreshTokenModel.saveRefreshToken(
        generateRefreshToken,
        verifyUser.id
      );

      if (!refreshToken)
        throw new ErrorHandler(400, "Erro ao salvar o refresh token!");

      res.status(200).json({
        status: 200,
        error: false,
        data: { accessToken: tokenJwt, refreshToken: generateRefreshToken },
      });
    } catch (error) {
      console.log(error);
      const { statusCode, message } = errorHandlerCatch(error);
      next(new ErrorHandler(statusCode, message));
    }
  }

  async refreshTokenUser(req: Request, res: Response, next: NextFunction) {
    const refreshAuth = req.headers.authorization;
    const refreshTokenModel = new RefreshTokenModel();

    const verifyRefreshToken = await verifyAndClearRefreshToken(refreshAuth);
    if (!verifyRefreshToken) throw new ErrorHandler(401, "Refresh token inválido!");

    const generateRefreshToken = await GenerateRefreshToken(verifyRefreshToken.id);
    const getUser = await refreshTokenModel.getUser(verifyRefreshToken.id);

    if (!getUser)
      throw new ErrorHandler(400, "Erro ao buscar os dados do refresh token!");

    const tokenJwt = generateToken({
      id: getUser.id,
      email: getUser.email,
      role: "admin",
    });
    console.log(generateRefreshToken);
    const refreshToken = await refreshTokenModel.updateRefreshToken(
      generateRefreshToken,
      getUser.id
    );

    if (!refreshToken)
      throw new ErrorHandler(400, "Erro ao salvar o refresh token!");

    res.status(200).json({
      status: 200,
      error: false,
      data: { accessToken: tokenJwt, refreshToken: generateRefreshToken },
    });
  }

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    const refreshAuth = req.headers.authorization;
    const tokenClear = refreshAuth?.split("Bearer ")[1];
    const refreshToken = await verifyAndClearRefreshToken(refreshAuth);
    const refreshTokenModel = new RefreshTokenModel();

    try {
      const logoutUser = await refreshTokenModel.logoutUser(
        tokenClear!,
        refreshToken.id
      );
      if (logoutUser.count <= 0)
        throw new ErrorHandler(401, "Refresh token inválido ou já deslogado!");

      res.status(200).json({
        status: 200,
        error: false,
        message: "Usuário deslogado com sucesso!",
      });
    } catch (error) {
      const { statusCode, message } = errorHandlerCatch(error);
      next(new ErrorHandler(statusCode, message));
    }
  }

  async routeTest(req: Request, res: Response, next: NextFunction) {
    res.status(200).json("user logged");
  }
}

export = new AuthController();
