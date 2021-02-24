import { Router } from 'express';

import {
  SigninController,
  SignupController,
  ProductListController,
  ProductDetailController
} from '../controllers';

const router = Router();

const signinController = new SigninController();
const signupController = new SignupController();
const productListController = new ProductListController();
const productDetailController = new ProductDetailController();

//- sessions
router.post('/sessions/signin', (req, res, next) =>
  signinController.signin(req, res, next)
);
router.post('/sessions/recover-password', (req, res, next) =>
  signinController.recoverPassword(req, res, next)
);
router.post('/sessions/signup', (req, res, next) =>
  signupController.signup(req, res, next)
);
router.post('/sessions/send-confirmation-code', (req, res, next) =>
  signupController.sendCode(req, res, next)
);

//- producs
router.get('/products', (req, res, next) =>
  productListController.handle(req, res, next)
);
router.get('/products/:id/:type', (req, res, next) =>
  productDetailController.handle(req, res, next)
);

export default router;
