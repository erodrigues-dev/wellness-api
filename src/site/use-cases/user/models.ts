export interface SignupData {
  name: string;
  email: string;
  phone: string;
  code: string;
  password: string;
  referral_code?: string;
}

export interface SendCodeData {
  name: string;
  email: string;
}
