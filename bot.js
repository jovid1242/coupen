const { Telegraf } = require('telegraf')
const { MenuTemplate, MenuMiddleware } = require('telegraf-inline-menu')
const createUser = require('./modules/createUsers.js')
const User = require('./model/TgUser')
const db = require('./db/config.js')
require('dotenv').config()

const menuTemplate = new MenuTemplate(ctx => `Привет ${ctx.from.first_name}! нажми чтобы получить код купопа =)`)

menuTemplate.interact('Получить код Купона', 'a', {
    do: ctx => {
        createUser(ctx, ctx.update.callback_query.id)
        // console.log(ctx.update.callback_query.id);
        ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id
        )
        return false
    }
})

const bot = new Telegraf(process.env.BOT_TOKEN2)
const menuMiddleware = new MenuMiddleware('/', menuTemplate)

bot.start((ctx) => menuMiddleware.replyToContext(ctx))
bot.on('message', (ctx) => {
    ctx.reply("Выберите действие.")
})
bot.help((ctx) => ctx.reply(`dos't held  `))
bot.hears('hi', (ctx) => {
    ctx.reply('Hey there')
})
bot.use(menuMiddleware)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))