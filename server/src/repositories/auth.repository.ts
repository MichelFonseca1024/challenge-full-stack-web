import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../dtos/user.dto";

class Auth {
  private prisma;
  private user;

  constructor() {
    this.prisma = new PrismaClient();
    this.user = this.prisma.user;
  }

  genToken(user: UserDTO) {
    const { id, name } = user;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    const token = jwt.sign({ id, name }, secret, {
      expiresIn: "2h",
    });
    return token;
  }

  async login(email: string, password: string) {
    const user = await this.user.findUnique({
      where: { email: email },
    });

    if (user === null) {
      throw new Error("Email ou senha inválido!");
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new Error("Email ou senha inválido!");
    }

    const token = this.genToken(user);
    const { name } = user;
    return { token, userData: { name, email } };
  }

  async verifyToken(oldToken: string, email: string, name: string) {
    const user = await this.user.findUnique({
      where: {
        email,
        name,
      },
    });

    if (!oldToken) {
      throw new Error("No token provided.");
    }

    if (user === null) {
      throw new Error("Fail to Authentication.");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables");
    }

    let token = null;
    jwt.verify(oldToken, secret, (err) => {
      if (err) {
        throw new Error("Fail to Authentication. Error -> " + err);
      } else {
        token = this.genToken(user);
      }
    });

    return { token, userData: { name, email } };
  }
}

export default Auth;
