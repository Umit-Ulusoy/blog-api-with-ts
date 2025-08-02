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
        message: "user registered successfully.",
        data
    });
  } catch (err) {
    next(err);
  }
};

