const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
const menuTemplate = require('./keyboard/button')
const User = require('./model/TgUser')
const checkUser = require('./modules/checkUser')
const checkMessage = require('./modules/checkMessage')
const db = require('./db/config.js')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
const menuMiddleware = new MenuMiddleware('/', menuTemplate)

bot.start(async (ctx) => {
    const check = await checkUser(ctx.message.chat.id)
    if (check === null) { menuMiddleware.replyToContext(ctx) } else {
        if (check === true) { ctx.reply('Привет Админ отправьте мне код купона!') } else {
            ctx.reply(`Добро пожаловать ${ctx.from.first_name}, Ваш код купона ${check.coupon}`, Extra.markup((markup) => {
                return markup.resize().keyboard([(`Статус`), (`Вывод денег`)])
            }))
        }
    }
})

bot.on('message', async (ctx) => { await checkMessage(ctx) })
bot.help((ctx) => ctx.reply(`dos't held  `))
// bot.use(Telegraf.log())
bot.use(menuMiddleware)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))