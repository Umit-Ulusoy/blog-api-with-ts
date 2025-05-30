import express from "express";
import * as categoryController from "@controllers/categoryController";
import { validate } from "@middlewares/validate";
import { createCategorySchema, updateCategorySchema } from "@schemas/categorySchema";

const router = express.Router();

router.post(
    "/",
    validate(createCategorySchema),
    categoryController.createCategory)
    ;

    router.get(
    "/",
    categoryController.getCategories)
    ;

        router.put(
    "/:categoryId",
    validate(updateCategorySchema),
    categoryController.updateCategory)
    ;

            router.delete(
    "/:categoryId",
    categoryController.deleteCategory)
    ;

    export default {
        path: "/categories",
        router
    };