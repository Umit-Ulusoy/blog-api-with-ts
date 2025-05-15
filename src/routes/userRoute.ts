import express from 'express';
import * as userController from '@controllers/userController';
import { createUserSchema } from '@schemas/userSchema';
import { validate } from '@middlewares/validate';

const router = express.Router();

router.post('/', validate(createUserSchema), userController.createUserController);

export default {
  path: '/users',
  router,
};
