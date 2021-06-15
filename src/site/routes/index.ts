import { Router } from 'express';

import upload from '../../shared/utils/multer-google-cloud-storage';
import { bindRoute } from '../../shared/utils/bindRoute';
import {
  makeAccountController,
  makeOrdersController,
  makeProductSearchController,
  makeGetDiscountController,
  makeCheckoutController,
  makeMyServicesListController,
  makeAppointmetnsListController,
  makeListDaysController,
  makeListSlotsController,
  makeBookController,
  makeSigninController,
  makeSignupController,
  makeProductListController,
  makeProductDetailController,
} from '../controllers';

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];

const router = Router();

//- controllers
const signinController = makeSigninController();
const signupController = makeSignupController();
const productListController = makeProductListController();
const productDetailController = makeProductDetailController();
const productSearchController = makeProductSearchController();
const accountController = makeAccountController();
const ordersController = makeOrdersController();
const getDiscountController = makeGetDiscountController();
const checkoutController = makeCheckoutController();
const servicesListController = makeMyServicesListController();
const appointmentsListController = makeAppointmetnsListController();
const listDaysController = makeListDaysController();
const listSlotsController = makeListSlotsController();
const bookController = makeBookController();

//- sessions
router.post('/sessions/signin', bindRoute(signinController, 'signin'));
router.post('/sessions/recover-password', bindRoute(signinController, 'recoverPassword'));
router.post('/sessions/signup', bindRoute(signupController, 'signup'));
router.post('/sessions/send-confirmation-code', bindRoute(signupController, 'sendCode'));

//- producs
router.get('/products', bindRoute(productListController, 'handle'));
router.get('/products/search', bindRoute(productSearchController, 'search'));
router.get('/products/categories', bindRoute(productSearchController, 'listCategories'));
router.get('/products/:id/:type', bindRoute(productDetailController, 'handle'));

//- account
router.get('/account', bindRoute(accountController, 'get'));
router.put('/account', bindRoute(accountController, 'save'));
router.put(
  '/account/change-image',
  upload(mimetypes).single('image'),
  accountController.changeImage.bind(accountController)
);
router.post('/account/generate-referral-code', bindRoute(accountController, 'generateReferralCode'));

//- account/cards
router.get('/account/cards', bindRoute(accountController, 'cards'));
router.post('/account/cards', bindRoute(accountController, 'createCard'));
router.delete('/account/cards/:card_id', bindRoute(accountController, 'deleteCard'));

//- orders
router.get('/orders', bindRoute(ordersController, 'list'));
router.get('/orders/:id', bindRoute(ordersController, 'get'));

//- checkout
router.post('/checkout', bindRoute(checkoutController, 'handle'));
router.get('/checkout/discounts', bindRoute(getDiscountController, 'handle'));

//- services
router.get('/services', bindRoute(servicesListController, 'handle'));

// - appointments
router.get('/appointments', bindRoute(appointmentsListController, 'handle'));

//- book
router.get('/book/days', bindRoute(listDaysController, 'handle'));
router.get('/book/slots', bindRoute(listSlotsController, 'handle'));
router.post('/book', bindRoute(bookController, 'handle'));


export default router;
