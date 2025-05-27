import Category from "@models/Category";
import AppError from "@exceptions/AppError";
import { CreateCategoryInput } from "@schemas/categorySchema";

export const createCategory = async (data: CreateCategoryInput) => {

  const name = data.name.trim()
  .toLowerCase();

  const existing = await Category.findOne({ name });
  if (existing) {
    throw new AppError('Validation errors occurred', 409)
    .setErrors([{
        field: "name",
        message: "Category already exists"
    }]);
  }

  const category = await Category.create({ name });

  return true;
};

