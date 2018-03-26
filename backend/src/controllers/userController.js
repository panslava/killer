const db = require('./dbController.js')
const {check, validationResult} = require('express-validator/check')
const {matchedData, sanitize} = require('express-validator/filter')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const adminPass = require('../instantiated/adminConfig.js')

// api here https://github.com/ctavan/express-validator
// and here https://github.com/chriso/validator.js

exports.create_user_post = [
    check('email', 'Invalid email')
        .trim().escape()
        .isEmail()
        .custom(value => {
            // 
            return db.findUserByEmail(value).then(user => {
                if (user.length != 0)
                    throw new Error('User with this email already registred')
            })
        })
    ,
    check('name.first', 'Invalid first name').trim().escape().isLength({min:1}).isAlpha('ru-RU'),
    check('name.last', 'Invalid last name').trim().escape().isLength({min:1}).isAlpha('ru-RU'),
    check('deathCode', 'DeathCode must be 4 numbers').trim().escape().isLength({min:4, max:4}).isNumeric(),
    check('vk', 'Vk can not be empty').trim().isLength({min:1}),
    check('course', 'Course can not be empty').trim().escape().isLength({min:1}),

    sanitize('email').trim().escape(),
    sanitize('name.first').trim().escape(),
    sanitize('name.last').trim().escape(),
    sanitize('deathCode').trim().escape(),
    sanitize('vk').trim(),
    sanitize('course').trim().escape(),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()})
        }
        const user = matchedData(req)
        if (req.body.admin == 'true') {
            if (req.body.adminPass != adminPass) {
                req.body.admin = false
            }
            else {
                user.deathCode = req.body.deathCode
                user.admin = req.body.admin
            }
        }
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

var photosPath = '/../src/photos/'

exports.update_user_photo = function (req, res) {
    if (!fs.existsSync('photos/')){
        fs.mkdirSync('photos/')
    }
    upload(req, res, (err) => {
        if (err || !req.file) return res.status(400).send('Invalid file. Only .png and .jpeg allowed')
        db.findUserById(req.body._id)
            .then((gotUser) => {
                if (!gotUser.length) {
                    fs.unlink(__dirname + photosPath + req.file.filename, (err) => {
                        if (err) return res.status(500).send('Error deleting uploaded file, in no user find case')
                        return res.status(400).send('No user with this id')
                    })
                }
                if (gotUser.photoState == 3) {
                    fs.unlink(__dirname + photosPath + req.file.filename, (err) => {
                        if (err) return res.status(500).send('Error deleting uploaded file, in already moderated case')
                        return res.status(400).send('Photo already passed moderation')
                    })
                }
                db.updateUserById(req.body._id, {photo: req.file.filename})
                    .then(() => {
                        db.updateUserById(req.body._id, {photoState: 1}).then(() => {
                            return res.status(200).send('Photo succesfully updated')
                        })
                    }).catch((err) => {
                        fs.unlink(__dirname + photosPath + req.file.filename, () => {
                            return res.status(500).send(err)
                        })
                    })
            }).catch((err) => {
                fs.unlink(__dirname + photosPath + req.file.filename, () => {
                    return res.status(500).send(err)
                })
            })
    })
}

exports.authorize = function (req, res) {
    req.body.email = req.body.email.toLowerCase()
    db.getByEmailDeathcode(req.body.email, req.body.deathCode).then((user) => {
        if (user.length == 0) return res.status(400).send('No match')
        return res.status(200).send(user)
    })
}

//Not implemented yet
exports.kill = function (req, res) {
    db.findUserById(req.body._id).then(() => {
        res.status(200).send('Fuck yeah')
    }).catch(() => res.status(400).send('No user with this id'))
}

exports.shuffle = function (req, responce) {
    db.checkAdmin(req.body.id).then(() => db.getRandomUserList().then((res) => {
        res[0].killerId = res[res.length - 1]
        if (res.length != 1) res[0].victimId = res[1]
        if (res.length != 1) res[res.length - 1].killerId = res[res.length - 2]
        res[res.length - 1].victimId = res[0]
        for (let i = 1; i < res.length - 1; i++) {
            res[i].killerId = res[i - 1]
            res[i].victimId = res[i + 1]
        }
        db.clearUsers().then(() => {
            db.rebuildCollection(res).then(() => {
                responce.status(200).send('Successfully shuffled')
            })
                .catch((err) => responce.status(500).send(err))
        })
    })).catch(() => responce.status(400).send('User is not admin'))
}
