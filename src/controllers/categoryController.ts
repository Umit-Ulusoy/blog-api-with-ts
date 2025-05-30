import { Request, Response, NextFunction } from "express";
import * as categoryService from "@services/categoryService";

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

  try {

    await categoryService.createCategory(req.validated!.body);

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

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { categoryId } = req.params;
    const categoryData = req.validated!.body;

    await categoryService.updateCategoryById(categoryId, categoryData);
    res.json({
      status: true,
      message: "Category updated successfully."
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { categoryId } = req.params;

    await categoryService.deleteCategoryById(categoryId);

    res.json({
      status: true,
      message: "Category deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};
