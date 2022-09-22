const fs = require('fs')
const chalk = require('chalk')

// Website Api
global.APIs = {
	zenz: 'https://zenzapis.xyz',
}

// Apikey Website Api
global.APIKeys = {
	'https://zenzapis.xyz': 'Your Key',
}

global.owner = ['51975954286']
global.premium = []

// Sticker Pack name & Author
global.packname = 'ネコ - NK'
global.author = 'Sticker.ly * Random'

global.prefa = ['', '!', '+', '#', '.']
global.nkfooter = 'NekoBot Simple - Multi Device'

global.mess = (type, m, neko) => {
    let msg = {
        owner: 'Este comando solo puede ser ejecutado por el *creador* de la bot!',
        group: 'Este comando solo puede ser ejecutado en *grupos*!',
        admin: 'Esta función solo puede ser ejecutado por los *administradores\'as* del grupo!',
        botadmin: 'La bot debe ser *administradora* para ejecutar esta función!',
    }[type]
    if (msg) return m.reply(msg)
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright("Update - 'config.js'"))
	delete require.cache[file]
	require(file)
})
