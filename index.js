const Telegraf = require('telegraf')
require('dotenv').config()

var jobs = []

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => {
    ctx.reply('Hello fellow students :)\nI help you get organized and, thats by far the best part of me, remember you to register for a course!\nI can not register you by myselfe since i do not and will never have your credentials so dont even get to the idea of posting them to me.')
    ctx.reply('Here is a list of all my commands so you might not forget them:\n/help get help\n/addalert add an alert\n/deletealert deleting an alert\n/list list all alerts')
    ctx.reply('I will explain every command as you execute it so do not worry :)')
})

bot.help((ctx) => {
    ctx.reply('Your call for help is answered')
    ctx.reply('/help get help\n/addalert add an alert\n/deletealert deleting an alert\n/list list all alerts')
})

bot.command('addalert', ctx => {
    console.log('[addalert] ' + ctx.message.text)
    ctx.reply('Added')
})

bot.command('deletealert', ctx => {
    console.log('[deletealert] ' + ctx.message.text)
    ctx.reply('Deleted')
})

bot.command('list', ctx => {
    console.log('[list] ' + ctx.message.text)
    ctx.reply('Listed')
})
bot.launch()