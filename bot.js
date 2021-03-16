const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
const checkUser = require('./modules/checkUser.js')
const menuTemplate = require('./keyboard/menu')
const User = require('./model/TgUser')
const db = require('./db/config.js')
require('dotenv').config()

// console.log(ctx.update.callback_query.id);


const bot = new Telegraf(process.env.BOT_TOKEN)
const menuMiddleware = new MenuMiddleware('/', menuTemplate)

bot.start(async (ctx) => {
    const check = await checkUser(ctx.message.chat.id)
    if (check === null) {
        menuMiddleware.replyToContext(ctx)
    } else {
        ctx.reply(`Ваш код ${check.coupon}`)
    }
})
// bot.command('special', (ctx) => {
//     return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
//         return markup.resize()
//             .keyboard([
//                 markup.contactRequestButton('отправить контакт')
//             ])
//     }))
// })
// bot.on('contact', (ctx) => {
//     console.log(ctx.update.message.contact);
// })
bot.on('message', (ctx) => {
    ctx.reply("Выберите действие.")
})
bot.help((ctx) => ctx.reply(`dos't held  `))
bot.use(Telegraf.log())
bot.use(menuMiddleware)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))