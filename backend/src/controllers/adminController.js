const userCollection = require('./db/user')
const playerCollection = require('./db/player')

exports.checkAdmin = async function (req, res, next) {
  const isAdmin = await userCollection.isAdmin(req.body.id)
  if (!isAdmin) {
    return res.status(400).send('User is not an admin')
  }
  else {
    next()
  }
}

exports.shuffle = async function (req, res) {
  try {
    const result = await playerCollection.getRandomList()

    result[0].killerId = result[result.length - 1]
    if (result.length !== 1) {
      result[0].victimId = result[1]
      result[result.length - 1].killerId = result[result.length - 2]
    }
    result[result.length - 1].victimId = result[0]
    for (let i = 1; i < result.length - 1; i++) {
      result[i].killerId = result[i - 1]
      result[i].victimId = result[i + 1]
    }

    await playerCollection.clearCollection()
    await playerCollection.rebuildGameUsers(result)
    res.status(200).send('Successfully shuffled')
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

exports.getAllUsers = async function (req, response) {
  try {
    const users = await userCollection.getAllUsers()
    response.status(200).send(users)
  }
  catch (err) {
    console.error(err)
    response.sendStatus(500)
  }
}

exports.getAllGameUsers = async function (req, response) {
  try {
    const users = await db.getAllUsers()
    response.status(200).send(users)
  }
  catch (err) {
    console.error(err)
    response.sendStatus(500)
  }
}

exports.acceptPhoto = async function (req, response) {
  try {
    const user = await db.findUserById(req.body.userId)
    if (!user) response.status(400).send('Target user not found')
    // NEED TO SEND EMAIL HERE!

    await db.updateUserById(user._id, {
      photoState: 3,
      modMessage: req.body.modMessage
    })

    response.status(200).send('Photo successfully accepted')
  }
  catch (err) {
    console.error(err)
    response.sendStatus(500)
  }
}

exports.rejectPhoto = async function (req, response) {
  try {
    const user = await db.findUserById(req.body.userId)
    if (!user) response.status(400).send('Target user not found')

    // NEED TO SEND EMAIL HERE!

    await db.updateUserById(user._id, {
      photoState: 2,
      modMessage: req.body.modMessage
    })

    response.status(200).send('Photo successfully rejected')
  }
  catch (err) {
    console.error(err)
    response.sendStatus(500)
  }
}
