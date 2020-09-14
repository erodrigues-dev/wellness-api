const upload = require('../../shared/utils/multer-google-cloud-storage')
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg']

module.exports = app => {
  app.post('/activities', upload(mimetypes).single('image'))
  app.put('/activities', upload(mimetypes).single('image'))
}
