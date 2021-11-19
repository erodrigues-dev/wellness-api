import { Router } from 'express';
import upload from '../../../shared/utils/multer-google-cloud-storage';

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
const router = Router();

router.put('/customers/:customerId/waivers', upload(mimetypes).single('signImage'));

export default router;
