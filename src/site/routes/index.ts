import { Router } from 'express';

import upload from '../../shared/utils/multer-google-cloud-storage';
import {
  ProductDetailController,
  ProductListController,
  SigninController,
  SignupController,
  makeAccountController,
  makeOrdersController,
  makeProductSearchController,
  makeGetDiscountController,
  makeCheckoutController,
  makeMyServicesListController
} from '../controllers';

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

const router = Router();

//- controllers
const signinController = new SigninController();
const signupController = new SignupController();
const productListController = new ProductListController();
const productDetailController = new ProductDetailController();
const productSearchController = makeProductSearchController();
const accountController = makeAccountController();
const ordersController = makeOrdersController();
const getDiscountController = makeGetDiscountController();
const checkoutController = makeCheckoutController();
const servicesListController = makeMyServicesListController();

//- sessions
router.post('/sessions/signin', signinController.signin.bind(signinController));
router.post('/sessions/recover-password', signinController.recoverPassword.bind(signinController));
router.post('/sessions/signup', signupController.signup.bind(signupController));
router.post('/sessions/send-confirmation-code', signupController.sendCode.bind(signupController));

//- producs
router.get('/products', productListController.handle.bind(productListController));
router.get('/products/search', productSearchController.search.bind(productSearchController));
router.get('/products/categories', productSearchController.listCategories.bind(productSearchController));
router.get('/products/:id/:type', productDetailController.handle.bind(productDetailController));

//- account
router.get('/account', accountController.get.bind(accountController));

router.put('/account', accountController.save.bind(accountController));

router.put(
  '/account/change-image',
  upload(mimetypes).single('image'),
  accountController.changeImage.bind(accountController)
);

//- account/cards
router.get('/account/cards', accountController.cards.bind(accountController));
router.post('/account/cards', accountController.createCard.bind(accountController));
router.delete('/account/cards/:card_id', accountController.deleteCard.bind(accountController));

//- orders
router.get('/orders', ordersController.list.bind(ordersController));
router.get('/orders/:id', ordersController.get.bind(ordersController));

//- checkout
router.post('/checkout', checkoutController.handle.bind(checkoutController));
router.get('/checkout/discounts', getDiscountController.handle.bind(getDiscountController));

//- services
router.get('/my-services', servicesListController.handle.bind(servicesListController));

export default router;
