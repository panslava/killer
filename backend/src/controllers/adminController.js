const db = require('./dbController.js')

exports.shuffle = function (req, response) {
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
                response.status(200).send('Successfully shuffled')
            })
                .catch((err) => response.status(500).send(err))
        })
    })).catch(() => response.status(400).send('User is not admin'))
}

exports.getAllUsers = function (req, response) {
    db.checkAdmin(req.body.id).then(() => {
        db.getAllUsers().then((users) => {
            response.status(200).send(users)
        }).catch(() => response.status(500))
    }).catch(() => response.status(400).send('User is not admin'))
}

exports.acceptPhoto = function (req, response) {
    db.checkAdmin(req.body.adminId).then(() => {
        db.findUserById(req.body.userId).then((user) => {
            if (user == null) response.status(400).send('Target user not found')
            //NEED TO SEND EMAIL HERE!
            db.updateUserById(user._id, {photoState: 3, modMessage: req.body.modMessage})
                .then(() => response.status(200).send('Success')).catch(() => response.status(500))
        }).catch(() => response.status(500))
    }).catch(() => response.status(400).send('Not admin'))
}

exports.rejectPhoto = function (req, response) {
    db.checkAdmin(req.body.adminId).then(() => {
        db.findUserById(req.body.userId).then((user) => {
            if (user == null) response.status(400).send('Target user not found')
            //NEED TO SEND EMAIL HERE!
            db.updateUserById(user._id, {photoState: 2, modMessage: req.body.modMessage})
                .then(() => response.status(200).send('Success')).catch(() => response.status(500))
        }).catch(() => response.status(500))
    }).catch(() => response.status(400).send('Not admin'))
}
