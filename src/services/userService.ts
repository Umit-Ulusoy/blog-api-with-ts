import User from "@models/User";
import AppError from '@exceptions/AppError';
import { CreateUserInput, GetUsersQueryInput, UpdateUserInput } from '@schemas/userSchema';

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

export const getUsers = async (query: GetUsersQueryInput) => {
  const { username, limit = '10', page = '1' } = query;

  const filter: Record<string, any> = {};
  if (username) {
    filter.username = { $regex: username, $options: 'i' };
  }

  const numericLimit = parseInt(limit, 10);
  const numericPage = parseInt(page, 10);
  const skip = (numericPage - 1) * numericLimit;

  const [users, total] = await Promise.all([
    User.find(filter).skip(skip).limit(numericLimit),
    User.countDocuments(filter),
  ]);

  return {
    data: users,
    meta: {
      total,
      page: numericPage,
      limit: numericLimit,
      totalPages: Math.ceil(total / numericLimit),
    },
  };
};

export const getUserById = async (userId: string) => {
  
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const deleteUser = async (userId: string) => {
  
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return true;
};
