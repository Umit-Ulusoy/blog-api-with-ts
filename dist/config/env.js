import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
    APP_PORT: z
        .string()
        .transform(Number)
        .refine((port) => !isNaN(port) && port > 0, {
        message: "APP_PORT must be a valid integer",
    }),
    APP_ENV: z.enum(["development", "production"]),
    MONGODB_URI: z.string(),
    JWT_SECRET: z.string().min(10, {
        message: "JWT_SECRET must be at least 10 characters",
    }),
    JWT_EXPIRES_IN: z.string(),
    JWT_REFRESH_SECRET: z.string().min(10, {
        message: "JWT_REFRESH_SECRET must be at least 10 characters",
    }),
    JWT_REFRESH_EXPIRES_IN: z.string(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z
        .string()
        .transform(Number)
        .refine((p) => !isNaN(p), { message: "SMTP_PORT must be a valid integer" }),
    SMTP_USER: z.string(),
    SMTP_PASS: z.string(),
    EMAIL_FROM: z.string().email({
        message: "EMAIL_FROM must be a valid e-mail address",
    }),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error("❌ .env validation failed:");
    console.error(_env.error.format());
    process.exit(1);
}
export const env = _env.data;
