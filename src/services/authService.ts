import User from "@models/User";
import { RegisterUserInput, LoginUserInput } from "@schemas/authSchema";
import * as tokenService from "@services/tokenService";
import * as emailService from "@services/emailService";
import * as jwtHelper from "@helpers/jwtHandler";
import AppError from "@exceptions/AppError";
import { log } from "console";

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

  const html = `
  <pre>
  Hello there dear ${newUser.username},
  
  thanks for registration to BurMit - My Blog.
  
  To complete your registration, please verify your email by clicking the link below.
  
  <a role='button' href='https://burmit.blog/auth/verify-email/asdfasfsafd'>Verify My Email</a>
  </pre>
  `;

  await emailService.sendEmail({
    to: newUser.email,
    subject: 'Welcome to Burmit',
    html
  });

const { accessToken, refreshToken } = await tokenService.createAuthTokens(newUser._id as string);

  return {
    accessToken,
    refreshToken
  };
};


export const loginUser = async (data: LoginUserInput) => {
  const { emailOrUsername, password } = data;

  const user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: emailOrUsername }]
  });

  const isValid = user && (await user.matchPassword(password!));

  if (!isValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const { accessToken, refreshToken } = await tokenService.createAuthTokens(
    user._id as string
  );

  return {
    accessToken,
    refreshToken
  };
};

export const logoutUser = async (tokenData: string) => {

  const token = await jwtHelper.decodeToken(tokenData);

  await tokenService.clearTokenByJTI(token.jti!)
}