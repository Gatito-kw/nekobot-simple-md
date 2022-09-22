/**
   * Created by Gatito - ネコ
   * Follow https://github.com/Gatito-kw
*/

const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const { JSDOM } = require('jsdom')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { Primbon } = require('scrape-primbon')
const primbon = new Primbon()
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')

module.exports = neko = async (neko, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "Sin nombre"
        const botNumber = await neko.decodeJid(neko.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const fatkuns = (m.quoted || m)
        const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        const isMedia = /image|video|sticker|audio/.test(mime)
	
        // Información de Grupo
        const groupMetadata = m.isGroup ? await neko.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    	const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    	const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const isPremium = isCreator || global.premium.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender) || false
	
	
	try {
        let isNumber = x => typeof x === 'number' && !isNaN(x)
        
        let user = db.data.users[m.sender]
        if (typeof user !== 'object') db.data.users[m.sender] = {}
        if (user) {
            if (!('name' in user))
                    user.name = ''
            if (!('registered' in user))
                    user.registeredr = false
            if (!isNumber(user.level))
                    user.level = 0
            if (!isNumber(user.exp))
                    user.exp = 0
            if (!isNumber(user.money))
                    user.money = 0
            if (!isNumber(user.diamond))
                    user.diamond = 0
            if (!isNumber(user.emerald))
                    user.emerald = 0
            if (!isNumber(user.gold))
                    user.gold = 0
            if (!isNumber(user.iron))
                    user.iron = 0
            if (!isNumber(user.coal))
                    user.coal = 0
            if (!isNumber(user.stone))
                    user.stone = 0
        } else global.db.data.users[m.sender] = {
            name: '',
            reg: false,
            level: 0,
            exp: 0,
            money: 0,
            
            // Minerales
            diamond: 0,
            emerald: 0,
            gold: 0,
            iron: 0,
            carbon: 0,
            piedra: 0,
        }
    
        let chats = db.data.chats[m.chat]
        if (typeof chats !== 'object') db.data.chats[m.chat] = {}
        if (chats) {
            if (!('banchat' in chats))
                    chats.banchat = false
            if (!('mute' in chats))
                    chats.mute = false
            if (!('antilink' in chats))
                    chats.antilink = false
        } else global.db.data.chats[m.chat] = {
            banchat: false,
            mute: false,
            antilink: false,
        }
		
	    let setting = db.data.settings[botNumber]
        if (typeof setting !== 'object') db.data.settings[botNumber] = {}
	    if (setting) {
	        if (!('public' in setting))
	                setting.public = true
	        if (!('anticall' in setting))
	                setting.anticall = true
		    if (!isNumber(setting.status))
		            setting.status = 0
	    } else global.db.data.settings[botNumber] = {
	        public: true,
	        anticall: true,
		    status: 0,
	    }
        } catch (e) {
            console.error(e)
        }
	    
        // Modo privado & público
        if (db.data.settings[botNumber].public && !isCreator) {
            if (!m.key.fromMe) return
        }
        
        // Vista de mensaje en la consola && Auto leído el el chat de WhatsApp
        if (m.message) {
            neko.readMessages([m.key])
            console.log('\n', chalk.black(chalk.redBright('[ INFO ]')), chalk.black(chalk.bgGreen((new Date).toTimeString())), chalk.black(chalk.bgYellow(m.mtype)), '\n', chalk.black(chalk.white(budy)), '\n• | ', chalk.magenta('De'), chalk.green(pushname), '-', chalk.yellow(m.sender), '\n• | ', chalk.magenta('En'), chalk.green(m.isGroup ? groupName : 'chat privado'), '-', chalk.yellow(m.chat))
        }

    switch (command) {
    case 'minar': case 'mine': {
        let user = db.data.users[m.sender]
        let type = (text || '').toLowerCase()
	    switch (type) {
	    case 'estaño': case 'tin': {
	        //let tin_ore = (user.)
	        let tin = Math.ceil(Math.random() * 3)
	        m.reply(`⛏️ | Has minado ${tin} de *Estaño*`)
	        
	        
	    }
	    break
        }
    }
    break
    default:
        if (budy.startsWith('=>')) {
        if (!isCreator) return !1
            function Return(sul) {
            sat = JSON.stringify(sul, null, 2)
            bang = util.format(sat)
            if (sat == undefined) {
                bang = util.format(sul)
            }
                return m.reply(bang)
            }
        try {
            m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
        } catch (e) {
            m.reply(String(e))
        }
        }

        if (budy.startsWith('>')) {
        if (!isCreator) return !1
        try {
            let evaled = await eval(budy.slice(2))
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
            await m.reply(evaled)
        } catch (e) {
            await m.reply(String(e))
        }
        }

        if (budy.startsWith('$')) {
        if (!isCreator) return !1
            exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(`${err}`)
            if (stdout) return m.reply(stdout)
            })
        }
    }

    } catch (e) {
        console.log(e)
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright("Update - 'neko.js'"))
	delete require.cache[file]
	require(file)
})