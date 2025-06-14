import Token from "@models/Token";
import AppError from "@exceptions/AppError";

type TokenData = {
  userId: string;
  jti: string;
  expiresAt: Date;
};

export const saveToken = async ({
  userId,
  jti,
  expiresAt
}: TokenData) => {
  
  await Token.create({
    userId,
    jti,
    expiresAt
  });
};
 