const db = require('./dbController.js')
const {check, validationResult} = require('express-validator/check')
const {matchedData, sanitize} = require('express-validator/filter')

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
    check('deathcode', 'Код на убийство должен состоять из 4 цифр').trim().escape().isLength({min:4, max:4}).isNumeric(),
    
    //Нужно ли проверять курс?

    sanitize('email').trim().normalizeEmail().escape(),
    sanitize('name.first').trim().escape(),
    sanitize('name.last').trim().escape(),
    sanitize('deathcode').trim().escape(),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.mapped()})
        }
        const user = matchedData(req)
        db.createUser(user).then(() => res.sendStatus(200)).catch(() => res.sendStatus(500))
    }
]

exports.get_user = function (req, res) {
    res.send('Not implemented: get_user')
}