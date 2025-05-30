import Category from "@models/Category";
import AppError from "@exceptions/AppError";
import { CreateCategoryInput, UpdateCategoryInput } from "@schemas/categorySchema";

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

export const getCategories = async () => {

    const categories = Category.find()
    .sort("-createdAt");

  return categories;
};

export const updateCategoryById = async (categoryId: string, categoryData: UpdateCategoryInput) => {

  const name = categoryData.name
  .trim()
  .toLowerCase();

    const existingCategory = await Category.findOne({
      _id: { $ne: categoryId },
      name
    });

    if (existingCategory) {
throw new AppError("Validation errors occurred.", 400)
.setErrors([
  {
    field: "name",
    message: "Category already exists"
  }
]);
    }

const category = await Category.findById(categoryId);

if (!category) {
  throw new AppError(
    "Category not found!",
    404
  );
}

category.name = categoryData.name;

await category.save();

  return true;
};

