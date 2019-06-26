const Telegraf = require('telegraf')
const moment = require('moment')
var schedule = require('node-schedule')
require('dotenv').config()

var jobs = []
var commandlines = []
var counter = 0
var clCnt = 0

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
    commandlines.push({
        from: ctx.message.from,
        status: 'addalert'
    })
    ctx.reply('Please enter the date in a similar way to the current timestamp-format:\n\n' + moment().format())
})

bot.command('deletealert', ctx => {
    console.log('[deletealert] ' + ctx.message.text)
    ctx.reply('Deleted')
})

bot.command('list', ctx => {
    console.log('[list] ' + ctx.message.text)
    ctx.reply('Listed')
})

bot.on('message', ctx => {
    console.log('[callback] Message received')
    var commandline = getCommandlineByUser(ctx.message.from)
    if (commandline === undefined || commandline.length === 0) {
        ctx.reply('You, Sir, have no command open!')
        return
    }
    commandline = commandline[0]
    switch (commandline.status) {
        case 'addalert':
            console.log('[case] addalert')
            commandline.date = ctx.message.text
            ctx.reply('Please enter the course number and or short description')
            commandline.status = 'date'
            break
        case 'date':
            console.log('[case] date')
            commandline.course = ctx.message.text
            var curJob = {
                ctx: ctx,
                id: counter,
                date: commandline.date,
                course: commandline.course,
                from: commandline.from
            }
            console.log('Job set for job with id ' + curJob.id + ' at ' + curJob.date)
            curJob.j = schedule.scheduleJob(curJob.date, function (id) {
                var job = getJobByID(id)
                console.log('Executing job with id ' + job.id)
                job.ctx.reply('!Reminder from ' + job.from.first_name + ' ' + job.from.last_name + '!')
                job.ctx.reply(job.course)
            }.bind(null, counter))
            counter++
            jobs.push(curJob)
            break
    }
})
bot.launch()


function getCommandlineByUser (user) {
    console.log('[function] getCommandlineByUser')
    var retArr = []
    commandlines.forEach(cl => {
        if (cl.from.id === user.id) retArr.push(cl)
    })
    return retArr
}

function getJobByID (id) {
    for (var job of jobs) {
        if (job.id === id) return job
    }
}