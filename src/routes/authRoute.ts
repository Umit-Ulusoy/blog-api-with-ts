import express from "express";
import * as authController from "@controllers/authController";
import { validate } from "@middlewares/validate";
import { registerUserSchema, loginUserSchema } from "@schemas/authSchema";

const router = express.Router();

router.post(
    "/register",
    validate(registerUserSchema),
    authController.registerUser)
    ;

    router.post(
    "/login",
    validate(loginUserSchema),
    authController.loginUser)
    ;


    export default {
        path: "/auth",
        router
    };