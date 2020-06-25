const multer = require('multer')

const { createFileFromStream, deleteFile } = require('./google-cloud-storage')

function handleFile(req, file, cb) {
  createFileFromStream(file.stream, file.originalname)
    .then(({ url, filename }) => cb(null, { url, filename }))
    .catch(cb)
}

function removeFile(req, file, cb) {
  deleteFile(file.filename)
    .then(() => cb(null))
    .catch(cb)
}

function fileFilter(mimetypes, file, cb) {
  if (mimetypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File not permitted'))
  }
}

module.exports = mimetypes => {
  return multer({
    fileFilter: (_, file, cb) => fileFilter(mimetypes, file, cb),
    storage: {
      _handleFile: handleFile,
      _removeFile: removeFile
    }
  })
}
