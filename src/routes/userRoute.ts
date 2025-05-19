import express from 'express';
import * as userController from '@controllers/userController';
import { createUserSchema, getUsersQuerySchema } from '@schemas/userSchema';
import { validate } from '@middlewares/validate';

const router = express.Router();

router.post(
  '/',
  validate(createUserSchema),
  userController.createUser);

  router.get(
  '/:userId',
  userController.getUser);

router.delete(
  '/:userId',
  userController.deleteUser);

export default {
  path: '/users',
  router,
};
