const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const isCupon = require('./isCupon')
const isActivation = require('./isActivation')
const Coupon = require('./coupon')

const checkMessage = async (ctx) => {
    const text = ctx.message.text
    const coupon = await Coupon(ctx.message.chat.id, text)
    if (text === 'Статус') {
        const collection = global.DB.collection("tg_users")
        return collection.findOne({ chat_id: ctx.message.chat.id }).then((user => {
            return ctx.reply(`у вас ${user.active_coupon} активный купон, ${user.active_coupon * 8}см `)
        }))
    }

    if (text === 'Вывод денег') {
        const collection = global.DB.collection("tg_users")
        return collection.findOne({ chat_id: ctx.message.chat.id }).then((user => {
            return (
                ctx.reply('Теперь администратор вам напишет, подождите 5 минут 🙏🙏🙏'),
                ctx.telegram.sendMessage(927908860,
                    `@${user.user_name} хочет сделать вывод кол-во купон ${user.active_coupon}, => ${user.active_coupon * 8}см 🙏`
                )
            )
        }))
    }

    if (isCupon(text)) {
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
            return ctx.reply('Купон активирован')
        }
    }
}

module.exports = checkMessage