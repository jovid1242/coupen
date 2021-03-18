const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const isCupon = require('./isCupon')
const isActivation = require('./isActivation')
const Coupon = require('./coupon')

const checkMessage = async (ctx) => {
    const text = ctx.message.text
    if (text === 'Статус') {
        const collection = global.DB.collection("tg_users")
        return collection.findOne({ chat_id: ctx.message.chat.id }).then((user => {
            return `у вас ${user.active_coupon} активный купон, ${user.active_coupon * 8}см`
        }))
    }
    if (isCupon(text)) {
        const coupon = await Coupon(ctx.message.chat.id, text)
        if (coupon !== false) {
            return ctx.reply(`Вы хотите активировать купон `, Extra.markup((markup) => {
                return markup.resize()
                    .keyboard([
                        (`Активировать ${coupon}`)
                    ])
            }))
        }
    }
    else {
        const active = await isActivation(text, ctx)
        if (active) {
            return 'Купон активирован'
        }
    }
}

module.exports = checkMessage