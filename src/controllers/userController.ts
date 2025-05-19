import { Request, Response, NextFunction } from 'express';
import * as userService from '@services/userService';

export const createUser = async (
    req: Request,
    res: Response,
next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;

    const userId = await userService.createUser(userData);

    res.status(201).json({
      status: true,
      message: 'User created successfully!',
      data: { userId },
    });

  } catch (error) {
    next(error);
  }
  };

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const { userId } = req.params;
    
    const user = await userService.getUserById(userId);

    res.status(200).json({
      status: true,
      message: "User fetched successfully!",
      data: user
    });

  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const { userId } = req.params;
    
    await userService.deleteUser(userId);

    res.status(200).json({
      status: true,
      message: "User deleted successfully!",
    });

  } catch (error) {
    next(error);
  }
};
