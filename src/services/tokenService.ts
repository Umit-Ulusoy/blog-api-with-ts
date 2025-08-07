import { v4 as uuidv4 } from "uuid";
import Token from "@models/Token";
import * as jwtHelper from "@helpers/jwtHandler";
import AppError from "@exceptions/AppError";

type TokenData = {
  userId: string;
  jti: string;
  type: 'access' | 'refresh';
  expiresAt: Date;
};

export const saveToken = async ({
  userId,
  jti,
  type,
  expiresAt
}: TokenData) => {
  
  await Token.create({
    userId,
    jti,
    type,
    expiresAt
  });

  return true;
};
 
export const clearTokenByJTI = async (jti: string) => {
  
await Token.deleteOne({ jti });

return true;
}

export const clearAllTokensByUser = async (userId: string) => {

await Token.deleteMany({ userId });

return true;
}

export const createAccessToken = async (userId: string) => {

const jti = uuidv4();

const token = await jwtHelper.createAccessToken(userId, jti);
const expiresAt = await jwtHelper.getExpirationDate(token);

await saveToken({
  userId,
  jti,
  type: 'access',
  expiresAt
});

return token;
}

export const createRefreshToken = async (userId: string) => {

const jti = uuidv4();

const token = await jwtHelper.createRefreshToken(userId, jti);
const expiresAt = await jwtHelper.getExpirationDate(token);

await saveToken({
  userId,
  jti,
  type: 'refresh',
  expiresAt
});

return token;
}

export const createAuthTokens = async (userId: string): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {

  const accessToken = await createAccessToken(userId);
  const refreshToken = await createRefreshToken(userId);

  return {
    accessToken,
    refreshToken
  }
}
