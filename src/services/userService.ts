import User from "@models/User";
import AppError from '@exceptions/AppError';
import {
  CreateUserInput,
  GetUsersQueryInput,
  UpdateUserInput
} from '@schemas/userSchema';

export const createUser = async (data: CreateUserInput) => {
  const username = data.username.trim()
  .toLowerCase();
  const email = data.email.trim()
  .toLowerCase();
  const errors: { field?: string; message: string }[] = [];

  const existingUser = await User.findOne({
    $or: [
      { username },
      { email }
    ],
  });

  if (existingUser) {
    const isEmailTaken = existingUser.email.toLowerCase() === email;
    const isUsernameTaken = existingUser.username.toLowerCase() === username;

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
    User.find(filter)
      .skip(skip)
      .limit(numericLimit)
      .sort('-createdAt'),
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
    throw new AppError(
      "User not found.",
      404
    );
  }

  return user;
};

export const updateUserById = async (userId: string, userData: UpdateUserInput) => {
  
  const username = userData.username?.trim()
  .toLowerCase();
  const email = userData.email?.trim()
  .toLowerCase();
  const errors: { field?: string; message: string }[] = [];

  const filters: any[] = [];

  if (username) filters.push({ username });

  if (email) filters.push({ email });

  if (filters.length > 0) {
    const existingUser = await User.findOne({
      _id: { $ne: userId },
      $or: filters,
    });

    if (existingUser) {
      const isEmailTaken = email && existingUser.email.toLowerCase() === email;
      const isUsernameTaken = username && existingUser.username.toLowerCase() === username;

      if (isEmailTaken) {
        errors.push({
          field: "email",
          message: "Email is already in use."
        });
      }

      if (isUsernameTaken) {
        errors.push({
          field: "username",
          message: "Username is already in use."
        });
      }

      if (errors.length > 0) {
         throw new AppError("Validation errors occurred", 409)
        .setErrors(errors);
      }
    }
  }


  const user = await User.findByIdAndUpdate(userId, userData);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return true;
};

export const deleteUser = async (userId: string) => {

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new AppError(
      "User not found.",
      404
    );
  }

  return true;
};
