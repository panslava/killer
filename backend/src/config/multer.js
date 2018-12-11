const multer = require('multer')
const randomstring = require('randomstring')
const path = require('path')
const photosPath = path.join(__dirname, '../photos')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, photosPath)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      'photo-' + randomstring.generate(16) + path.extname(file.originalname)
    )
  }
})

module.exports.upload = multer({
  storage: storage,
  limits: { filesize: 25 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new Error('Only .png and .jpeg allowed'))
    }
    cb(null, true)
  }
}).single('photo')

module.exports.photosPath = photosPath
