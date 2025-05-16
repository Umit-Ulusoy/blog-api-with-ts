import User from "@models/User";
import AppError from '@exceptions/AppError';
import { CreateUserInput, UpdateUserInput } from '@schemas/userSchema';

export const createUser = async (data: CreateUserInput) => {
  const { username, email } = data;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    const isEmailTaken = existingUser.email === email;
    const isUsernameTaken = existingUser.username === username;

    let message = '';
    if (isEmailTaken && isUsernameTaken) {
      message = 'Both email and username are already in use.';
    } else if (isEmailTaken) {
      message = 'Email is already in use.';
    } else if (isUsernameTaken) {
      message = 'Username is already in use.';
    }

    throw new AppError(message, 409);
  }

  const user = await User.create(data);

  return user._id;
};

export const deleteUser = async (userId: string) => {
  
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return true;
};
