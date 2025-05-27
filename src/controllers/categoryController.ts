import { Request, Response, NextFunction } from "express";
import * as categoryService from "@services/categoryService";

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

  try {

    await categoryService.createCategory(req.body);

    res.status(201)
    .json({
        status: true,
        message: "Category created successfully."
    });
  } catch (err) {
    next(err);
  }
};

