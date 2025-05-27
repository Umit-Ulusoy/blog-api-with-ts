import express from "express";
import * as categoryController from "@controllers/categoryController";
import { validate } from "@middlewares/validate";
import { createCategorySchema } from "@schemas/categorySchema";

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

    export default {
        path: "/categories",
        router
    };