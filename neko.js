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
            if (!('reg' in user))
                    user.reg = false
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
            coal: 0,
            stone: 0,
        }
    
        let chats = db.data.chats[m.chat]
        if (typeof chats !== 'object') db.data.chats[m.chat] = {}
        if (chats) {
            if (!('chatmode' in chats))
                    chats.chatmodet = 'unban'
            if (!('antilink' in chats))
                    chats.antilink = false
        } else global.db.data.chats[m.chat] = {
            chatmode: 'unban',
            antilink: false,
        }
		
	    let setting = db.data.settings[botNumber]
        if (typeof setting !== 'object') db.data.settings[botNumber] = {}
	    if (setting) {
	        if (!('botmode' in setting))
	                setting.botmode = 'public'
	        if (!('anticall' in setting))
	                setting.anticall = true
		    if (!isNumber(setting.status))
		            setting.status = 0
	    } else global.db.data.settings[botNumber] = {
	        botmode: 'public',
	        anticall: true,
		    status: 0,
	    }
        } catch (e) {
            console.error(e)
        }
	    
        // Modo privado & público
        if (!isCreator && db.data.settings[botNumber].botmode === 'self') {
            if (!m.key.fromMe) return
        }
        
        // Vista de mensaje en la consola && Auto leído el el chat de WhatsApp
        if (m.message) {
            neko.readMessages([m.key])
            console.log('\n', chalk.black(chalk.redBright('[ INFO ]')), chalk.black(chalk.bgGreen((new Date).toTimeString())), chalk.black(chalk.bgYellow(m.mtype)), '\n', chalk.black(chalk.white(budy)), '\n• | ', chalk.magenta('De'), chalk.green(pushname), '-', chalk.yellow(m.sender), '\n• | ', chalk.magenta('En'), chalk.green(m.isGroup ? groupName : 'chat privado'), '-', chalk.yellow(m.chat))
        }
        
        if (db.data.chats[m.chat].antilink) {
            if (budy.match('chat.whatsapp.com')) {
                if (!isBotAdmins) return !1
                let gclink = ('https://chat.whatsapp.com/' + await neko.groupInviteCode(m.chat))
                let isGroupLink = new RegExp(gclink, 'i')
                let isgclink = isGroupLink.test(m.text)
                if (isgclink && isAdmins && isCreator) return !0
                m.reply(`Enlace detectado de *@${m.sender.split('@')[0]}*, en este grupo está prohibido enviar enlaces de otros grupos`, false, { mentions: [m.sender] })
                neko.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }
        }

    switch (command) {
    case 'menu': {
        m.reply('Menú en creación')
    }
    
    case 'botmode': {
        if (!m.isGroup) return mess('group', m, neko)
        if (!isAdmins) return mess('admin', m, neko)
        if (args[0] === 'self') {
            if (db.data.settings[botNumber].botmode == 'self') return m.reply('El modo privado ya estaba activado')
            db.data.settings[botNumber].botmode = 'self'
            m.reply('Se activó el *modo privado*, ahora nadie podrá utilizar ningún comando')
        } else if (args[0] === 'public') {
            if (db.data.settings[botNumber].botmode == 'public') return m.reply('El modo publico ya estaba activado')
            db.data.settings[botNumber].botmode = 'public'
            m.reply('Se activó el *modo publico*, ahora todos podrán utilizar los comandos')
        } else {
            let buttons = [
                { buttonId: 'botmode self', buttonText: { displayText: 'Privado' }, type: 1 },
                { buttonId: 'botmode public', buttonText: { displayText: 'Publico' }, type: 1 }
            ]
            await neko.sendButtonText(m.chat, buttons, '乂  *S E T T I N G  -  B O T*\n\n× Modo privado :\nNadie podrá utilizar los comandos de la bot\n\n× Modo publico :\nTodos podrán utilizar los comandos de la bot', nkfooter, m)
        }
    }
    break
    
    case 'antilink': {
        if (!m.isGroup) return mess('group', m, neko)
        if (!isBotAdmins) return mess('botadmin', m, neko)
        if (!isAdmins) return mess('admin', m, neko)
        if (args[0] === "on") {
            if (db.data.chats[m.chat].antilink) return m.reply('El antilink ya está activado en este grupo')
            db.data.chats[m.chat].antilink = true
            m.reply('Se activó el antilink en este grupo')
        } else if (args[0] === "off") {
            if (!db.data.chats[m.chat].antilink) return m.reply('El antilink ya está desactivado en este grupo')
            db.data.chats[m.chat].antilink = false
            m.reply('Se desactivó el antilink en este grupo')
        } else {
            let buttons = [
                { buttonId: 'antilink on', buttonText: { displayText: 'Antivar' }, type: 1 },
                { buttonId: 'antilink off', buttonText: { displayText: 'Desactivar' }, type: 1 }
            ]
            await neko.sendButtonText(m.chat, buttons, '乂  *A N T I  -  L I N K*\n\nElimina a todas las personas que envían enlaces de un grupo de WhatsApp', nkfooter, m)
        }
    }
    break
    
    case 'sticker': case 'stickergif': case 's': {
    if (/image/.test(mime)) {
        let media = await neko.downloadMediaMessage(qmsg)
        let encmedia = await neko.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(encmedia)
        } else if (/video/.test(mime)) {
            if (qmsg.seconds > 11) return m.reply('Etiqueta un video que tenga mínimo 10 segundos!')
            let media = await neko.downloadMediaMessage(qmsg)
            let encmedia = await neko.sendVideoAsSticker(m.chat, media, m, { packname: packname || '', author: author || '' })
            await fs.unlinkSync(encmedia)
        } else {
            m.reply(`Etiqueta o envia un video|imagen|gif con el comando *${prefix + command}* para convertirlo a sticker`)
        }
    }
    break
    
    case 'tagall': {
        if (!m.isGroup) return mess('group', m, neko)
        if (!isAdmins) throw mess('admin', m, neko)
        let teks = `乂  *T A G  -  A L L*\n\n• *Texto* : ${q ? q : '×'}\n\n`
        for (let mem of participants) {
            teks += `@${mem.id.split('@')[0]}\n`
        }
        neko.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
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
