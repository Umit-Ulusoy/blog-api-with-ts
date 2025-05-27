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

    export default {
        path: "/categories",
        router
    };