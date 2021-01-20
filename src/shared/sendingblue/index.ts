import Axios from 'axios';

import { SendEmailConfirmation } from './SendEmailConfirmation';
import { SendEmailRecoverPassword } from './SendEmailRecoverPassword';
import { SendEmailSchedule } from './SendEmailSchedule';
import { SendEmailService } from './SendEmailService';
import { SendEmailSignUp } from './SendEmailSignUp';

const api = Axios.create({
  baseURL: process.env.SENDINGBLUE_API_URL,
  headers: {
    'api-key': process.env.SENDINGBLUE_API_KEY
  }
});

const sendEmailService = new SendEmailService(api);

export const sendEmailConfirmation = new SendEmailConfirmation(
  sendEmailService
);
export const sendEmailSignUp = new SendEmailSignUp(sendEmailService);
export const sendEmailRecoverPassword = new SendEmailRecoverPassword(
  sendEmailService
);
export const sendEmailSchedule = new SendEmailSchedule(sendEmailService);
