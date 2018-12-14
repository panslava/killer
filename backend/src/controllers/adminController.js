const userDb = require('./db/user')
const gameDb = require('./db/game')

exports.checkAdmin = async function (req, res, next) {
  const isAdmin = await userDb.isAdmin(req.body.id)
  if (!isAdmin) {
    return res.status(400).send('User is not an admin')
  }
  else {
    next()
  }
}

function shuffleArray (a) {
  let j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

exports.shuffle = async function (req, res) {
  try {
    const result = await gameDb.getAllPlayers()
    shuffleArray(result)

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

    await gameDb.clearCollection()
    await gameDb.rebuildGameUsers(result)
    res.status(200).send('Successfully shuffled')
  }
  catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

exports.getAllUsers = async function (req, response) {
  try {
    const users = await userDb.getAllUsers()
    response.status(200).send(users)
  }
  catch (err) {
    console.error(err)
    response.sendStatus(500)
  }
}

exports.getAllPlayers = async function (req, response) {
  try {
    const players = await gameDb.getAllPlayers(req.body.game_id)
    response.status(200).send(players)
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
