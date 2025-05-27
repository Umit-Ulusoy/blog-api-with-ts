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

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
  try {

    const categories = await categoryService.getCategories();

    res.json({
        status: true,
        message: "Categories listed successfully.",
        data: categories
    });
  } catch (err) {
    next(err);
  }
};

