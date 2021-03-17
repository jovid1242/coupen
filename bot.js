const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
const menuTemplate = require('./keyboard/button')
const User = require('./model/TgUser')
const checkUser = require('./modules/checkUser')
const Coupon = require('./modules/coupon')
const isCupon = require('./modules/isCupon')
const isActivation = require('./modules/isActivation')
const db = require('./db/config.js')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
const menuMiddleware = new MenuMiddleware('/', menuTemplate)

bot.start(async (ctx) => {
    const check = await checkUser(ctx.message.chat.id)
    if (check === null) {
        menuMiddleware.replyToContext(ctx)
    } else {
        ctx.reply(`Добро пожаловать ${ctx.from.first_name}, Ваш код купона ${check.coupon}`)
    }
})

bot.on('message', async (ctx) => {
    const text = ctx.message.text
    if (isCupon(text)) {
        const coupon = await Coupon(ctx.message.chat.id, text)
        return ctx.reply(`Вы хотите активировать купон `, Extra.markup((markup) => {
            return markup.resize()
                .keyboard([
                    (`Активировать ${coupon}`)
                ])
        }))
    }

    if (isActivation(text)) {
        ctx.reply('active')
        return
    }
    return
})
bot.help((ctx) => ctx.reply(`dos't held  `))
// bot.use(Telegraf.log())
bot.use(menuMiddleware)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))