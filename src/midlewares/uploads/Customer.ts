import { Router } from 'express'

import upload from '../../shared/utils/multer-google-cloud-storage'

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg']
const router = Router()

router.post('/customers', upload(mimetypes).single('image'))
router.put('/customers', upload(mimetypes).single('image'))

export default router
