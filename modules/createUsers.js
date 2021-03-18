const User = require('../model/TgUser')
const db = require('../db/config.js')

const createUser = (ctx) => {
    let userCoupon = Math.floor(Math.random() * 99999 + 20000);
    var user = new User({
        chat_id: ctx.update.callback_query.message.chat.id,
        admin: 0,
        coupon: userCoupon,
        active_coupon: 0,
        first_name: ctx.update.callback_query.message.chat.first_name,
        user_name: ctx.update.callback_query.message.chat.username,
        is_bot: ctx.update.callback_query.from.is_bot,
        language_code: ctx.update.callback_query.from.language_code,
        type: ctx.update.callback_query.message.chat.type,
        date: ctx.update.callback_query.date
    })
    const collection = global.DB.collection("tg_users")
    collection.insertOne(user, function (err, result) {
        if (err) {
            ctx.telegram.sendMessage(user.chat_id,
                `Произошла ошибка! ${err}`
            )
        } else {
            ctx.telegram.sendMessage(user.chat_id,
                `Ваш код ${user.coupon}`
            )
        }
    })
}

module.exports = createUser