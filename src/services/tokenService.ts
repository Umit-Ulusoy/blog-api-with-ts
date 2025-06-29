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
