import { Router } from 'express';

import { SigninController, SignupController } from '../controllers';
import { ProductListController } from '../controllers/products/ProductListController';

const router = Router();

const signinController = new SigninController();
const signupController = new SignupController();
const productListController = new ProductListController();

//- sessions
router.post('/sessions/signin', (req, res, next) =>
  signinController.handle(req, res, next)
);
router.post('/sessions/recover-password', (req, res, next) =>
  signinController.recoverPassword(req, res, next)
);
router.post('/sessions/signup', (req, res, next) =>
  signupController.handle(req, res, next)
);
router.post('/sessions/send-confirmation-code', (req, res, next) =>
  signupController.sendCode(req, res, next)
);

//- producs
router.get('/products', (req, res, next) =>
  productListController.list(req, res, next)
);

export default router;
