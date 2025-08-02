import express from "express";
import * as authController from "@controllers/authController";
import { validate } from "@middlewares/validate";
import { registerUserSchema } from "@schemas/userSchema";

const router = express.Router();

router.post(
    "/register",
    validate(registerUserSchema),
    authController.registerUser)
    ;


    export default {
        path: "/auth",
        router
    };