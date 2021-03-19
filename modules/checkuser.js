const db = require('../db/config.js')

const checkUser = function (chat_id) {
    const collection = global.DB.collection("tg_users")
    return collection.findOne({ chat_id: chat_id }).then((user => {
        if (user.admin === 1) {
            return true
        } else { return user }
    }))
}

module.exports = checkUser