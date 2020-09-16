import { Router } from 'express'
import upload from '../../shared/utils/multer-google-cloud-storage'

const mimetypes = ['image/png', 'image/jpg', 'image/jpeg']
const router = Router()

router.post('/employees', upload(mimetypes).single('image'))
router.put('/employees', upload(mimetypes).single('image'))

export default router
