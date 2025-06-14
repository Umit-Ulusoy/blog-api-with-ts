import jwt from "jsonwebtoken";
import AppError from "@exceptions/AppError";
import { env } from "@config/env";

const {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN
} = env;

export const createAccessToken = (userId: string, jti: string) => {

  return jwt.sign(
    { userId, jti },
    JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

export const createRefreshToken = (userId: string, jti: string) => {

  return jwt.sign(
    { userId, jti },
    JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

