import { Request, Response, NextFunction } from 'express';
import * as userService from '@services/userService';

// Kullanıcı oluşturma controller'ı
export const createUserController = async (
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
