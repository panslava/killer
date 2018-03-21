const db = require('./dbController.js')
const {check, validationResult} = require('express-validator/check')
const {matchedData, sanitize} = require('express-validator/filter')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// api here https://github.com/ctavan/express-validator
// and here https://github.com/chriso/validator.js

exports.create_user_post = [
    check('email', 'Некорректный email')
        .trim().normalizeEmail().escape()
        .isEmail()
        .custom(value => {
            // 
            return db.findUserByEmail(value).then(user => {
                if (user.length != 0)
                    throw new Error('Пользователь с таким Email уже существует')
            })
        })
    ,
    check('name.first', 'Имя не может быть пустым').trim().escape().isLength({min:1}),
    check('name.last', 'Фамилия не может быть пустой').trim().escape().isLength({min:1}),
    check('deathCode', 'Код на убийство должен состоять из 4 цифр').trim().escape().isLength({min:4, max:4}).isNumeric(),
    
    //Нужно ли проверять курс?

    sanitize('email').trim().normalizeEmail().escape(),
    sanitize('name.first').trim().escape(),
    sanitize('name.last').trim().escape(),
    sanitize('deathCode').trim().escape(),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()})
        }
        const user = matchedData(req)
        db.createUser(user).then(() => res.sendStatus(200)).catch(() => res.sendStatus(500))
    }
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'photos/')
    },
    filename: (req, file, cb) => {
        cb(null, 'photo-' + Date.now() + path.extname(file.originalname))
    },
})

var upload = multer({
    storage: storage,
    limits: {filesize: 50 * 1024 * 1024},
    fileFilter: function(req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('Only .png and .jpeg allowed'))
        }
        cb(null, true)
    }
}).single('photo')

exports.update_user_photo = function (req, res) {
    if (!fs.existsSync('photos/')){
        fs.mkdirSync('photos/')
    }
    upload(req, res, (err) => {
        if (err) return res.status(500).send(err)
        db.findUserById(req.body.id)
            .then((gotUser) => {
                if (!gotUser.length) {
                    fs.unlinkSync(__dirname + '/../src/photos/' + req.file.filename)
                    return res.status(400).send('No user with this id')
                }
                if (gotUser.photoState == 3) {
                    fs.unlinkSync(__dirname + '/../src/photos/' + req.file.filename)
                    return res.status(400).send('Фото уже прошло модерацию')
                }
                db.updateUserPhoto(req.body.id, req.file.filename)
                    .then(() => {
                        db.updateUserPhotoState(req.body.id, 1).then(() => {
                            res.status(200).send('Photo succesfully updated')
                        })
                    }).catch((err) => {
                        fs.unlinkSync(__dirname + '/../src/photos/' + req.file.filename)
                        res.status(500).send(err)
                    })
            }).catch((err) => {
                fs.unlinkSync(__dirname + '/../src/photos/' + req.file.filename)
                res.status(500).send(err)
            })
    })
}

exports.get_user = function (req, res) {
    res.send('Not implemented: get_user')
}