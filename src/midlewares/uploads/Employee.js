const upload = require('../../shared/utils/multer-google-cloud-storage')
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg']

module.exports = app => {
  app.post('/employees', upload(mimetypes).single('image'))
  app.put('/employees', upload(mimetypes).single('image'))
}
