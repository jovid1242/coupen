const createUser = require('../modules/createUsers.js')
const { MenuTemplate } = require('telegraf-inline-menu')

const menuTemplate = new MenuTemplate(ctx => `Привет ${ctx.from.first_name}! нажми чтобы получить код купопа =)`)

menuTemplate.interact('Получить код Купона', 'a', {
    do: ctx => {
        createUser(ctx)
        // console.log(ctx.update.callback_query.id);
        ctx.telegram.deleteMessage(
            ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id
        )
        return false
    }
})
module.exports = menuTemplate