import { Router } from 'express';

import upload from '../../shared/utils/multer-google-cloud-storage';

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
const router = Router();

router.post('/activities', upload(mimetypes).single('image'));
router.put('/activities', upload(mimetypes).single('image'));

export default router;
