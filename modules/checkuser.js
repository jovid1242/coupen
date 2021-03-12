const db = require('../db/config.js')

const checkUser = function (chat_id) {
    const collection = global.DB.collection("tg_users")
    return collection.findOne({ chat_id: chat_id }).then((user => {
        if (user === null) {
            return menuMiddleware.replyToContext(ctx)
        } else {
            if (user.admin === 1) {
                return ctx.reply('Привет Админ отправьте мне код купона!')
            } else {
                ctx.reply(`Добро пожаловать ${ctx.from.first_name}, Ваш код купона ${check.coupon}`, Extra.markup((markup) => {
                    return markup.resize().keyboard([(`Статус`), (`Вывод денег`)])
                }))
            }
        }
    }))
}

module.exports = checkUser