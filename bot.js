const Telegraf = require('telegraf')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
const menuTemplate = require('./keyboard/menu')
const User = require('./model/TgUser')
const checkUser = require('./modules/checkUser')
const isAdmin = require('./modules/isAdmin')
const updateCoupon = require('./modules/updateCoupon')
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
    const isadmin = await isAdmin(ctx.message.chat.id, ctx.message.text)
    const update = await updateCoupon(Number(isadmin))
    // console.log(update);
    ctx.reply(update)
})
bot.help((ctx) => ctx.reply(`dos't held  `))
// bot.use(Telegraf.log())
bot.use(menuMiddleware)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))