import Axios from 'axios';

import { SendEmailCustomer } from './customer/SendEmailCustomer';
import { SendEmailConfirmation } from './SendEmailConfirmation';

const api = Axios.create({
  baseURL: process.env.SENDINGBLUE_API_URL,
  headers: {
    'api-key': process.env.SENDINGBLUE_API_KEY
  }
});

export const sendEmailCustomer = new SendEmailCustomer(api);
export const sendEmailConfirmation = new SendEmailConfirmation(api);
