const upload = require('../../utils/multer-google-cloud-storage')
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg']

module.exports = app => {
  app.post('/packages', upload(mimetypes).single('image'))
  app.put('/packages', upload(mimetypes).single('image'))
}
