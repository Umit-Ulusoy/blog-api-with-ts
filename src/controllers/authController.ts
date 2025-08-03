import { Request, Response, NextFunction } from "express";
import * as authService from "@services/authService";

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

  try {

    const data = await authService.registerUser(req.validated!.body);

    res.status(201)
    .json({
        status: true,
        message: "User registered successfully.",
        data
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

  try {

    const data = await authService.loginUser(req.validated!.body);

    res.status(200)
    .json({
        status: true,
        message: "User logged in successfully.",
        data
    });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

  try {

        const authHeader = req.headers['authorization'];
    const tokenData = authHeader && authHeader.split(' ')[1];
    
    await authService.logoutUser(tokenData!);

    res.status(200)
    .json({
        status: true,
        message: "User logged out successfully."
    });
  } catch (err) {
    next(err);
  }
};

