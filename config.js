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

global.sessionName = 'hisoka'
global.prefa = ['', '!', '+', '#', '.']


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright("Update - 'config.js'"))
	delete require.cache[file]
	require(file)
})