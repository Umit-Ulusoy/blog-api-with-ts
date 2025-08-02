import User from "@models/User";
import { RegisterUserInput } from "@schemas/userSchema";
import * as tokenService from "@services/tokenService";
import AppError from "@exceptions/AppError";

export const registerUser = async (data: RegisterUserInput) => {
  const { username, email, password } = data;

  const errors: { field: string; message: string; }[] = [];

  const existingUser = await User.isUserExist(username, email);

    const { isUsernameTaken, isEmailTaken } = existingUser;

    if (isEmailTaken) {
      errors.push({ field: 'email', message: 'Email is already in use.' });
    }

    if (isUsernameTaken) {
      errors.push({ field: 'username', message: 'Username is already in use.' });
    }

    if (errors.length > 0) {
      const appError = new AppError('Validation errors occurred', 409);
      appError.setErrors(errors);
      throw appError;
    }
  
  const newUser = await User.create(data);

const { accessToken, refreshToken } = await tokenService.createAuthTokens(newUser._id as string);

  return {
    accessToken,
    refreshToken
  };
};

