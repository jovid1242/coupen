const db = require('../db/config.js')
const admin = require('./admin')

const isAdmin = (chat_id, coupon) => {
    const collection = global.DB.collection("tg_users")
    return collection.findOne({ chat_id: chat_id })
        .then((user) => {
            if (user.admin !== 0) {
                let reg = new RegExp('^[0-9]+$');
                if (reg.test(coupon)) {
                    return admin(coupon)
                } else {
                    return 'код не правильно'
                }
            } else {
                return '🤪'
            }
        })
}


module.exports = isAdmin