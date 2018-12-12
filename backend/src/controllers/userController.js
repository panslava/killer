const db = require('./dbController.js')
const { check, validationResult } = require('express-validator/check')
const { matchedData, sanitize } = require('express-validator/filter')
const path = require('path')
const fs = require('fs')

const adminPass = require('../config').authentication.adminPass
const photosPath = require('../config/multer').photosPath
const upload = require('../config/multer').upload

// api here https://github.com/ctavan/express-validator
// and here https://github.com/chriso/validator.js

exports.createUser = [
  check('email', 'Invalid email')
    .trim()
    .escape()
    .isEmail()
    .custom(value => {
      //
      return db.findUserByEmail(value).then(user => {
        if (user.length !== 0) {
          throw new Error('User with this email already registred')
        }
      })
    }),

  check('name.first', 'Invalid first name')
    .trim()
    .escape()
    .isLength({ min: 1 }),

  check('name.last', 'Invalid last name')
    .trim()
    .escape()
    .isLength({ min: 1 }),

  check('deathCode', 'DeathCode must be 4 numbers')
    .trim()
    .escape()
    .isLength({ min: 4, max: 4 })
    .isNumeric(),

  check('vk', 'Vk can not be empty')
    .trim()
    .isLength({ min: 1 }),

  check('course', 'Course can not be empty')
    .trim()
    .escape()
    .isLength({ min: 1 }),

  sanitize('email')
    .trim()
    .escape(),

  sanitize('name.first')
    .trim()
    .escape(),

  sanitize('name.last')
    .trim()
    .escape(),

  sanitize('deathCode')
    .trim()
    .escape(),

  sanitize('vk').trim(),

  sanitize('course')
    .trim()
    .escape(),

  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }

    const user = matchedData(req)
    if (req.body.admin === 'true') {
      if (req.body.adminPass !== adminPass) {
        req.body.admin = false
      }
      else {
        user.deathCode = req.body.deathCode
        user.admin = req.body.admin
      }
    }
    db.createUser(user)
      .then(() => res.status(200).send('User successfully registred'))
      .catch(() => res.sendStatus(500))
  }
]

exports.updateUserPhoto = function (req, res) {
  if (!fs.existsSync('photos/')) {
    fs.mkdirSync('photos/')
  }
  upload(async function (req, res, err) {
    if (err || !req.file) {
      return res
        .status(400)
        .send('Invalid file. Only .png and .jpeg allowed. Max size = 25MB')
    }
    try {
      const gotUser = await db.findUserById(req.body.id)
      if (!gotUser) res.status(400).send('User not found')
      if (gotUser.photoState === 3) {
        await fs.unlink(
          path.join(__dirname, photosPath, req.file.filename),
          err
        )
        return res.status(400).send('Photo already passed moderation')
      }
      else {
        if (fs.existsSync(path.join(__dirname, photosPath, gotUser.photo))) {
          fs.unlinkSync(path.join(__dirname, photosPath, gotUser.photo))
        }
        await db.updateUserById(req.body.id, {
          photo: req.file.filename,
          photoState: 1
        })
        return res.status(200).send('Photo succesfully updated')
      }
    }
    catch (err) {
      console.error(err)
      res.sendStatus(500)
    }
  })
}

exports.authorize = async function (req, res) {
  req.body.email = req.body.email.toLowerCase()

  try {
    const user = await db.getByEmailDeathcode(
      req.body.email,
      req.body.deathCode
    )

    if (user.length === 0) {
      return res.status(400).send('Invalid email or deathcode')
    }
    else return res.status(200).send(user)
  }
  catch (err) {
    console.error(err)
    req.sendStatus(500)
  }
}

exports.dropCollection = async function () {
  return db.dropUsers()
}

// Not implemented yet
// exports.kill = function (req, res) {
// }
