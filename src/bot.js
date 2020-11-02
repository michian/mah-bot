require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '!';

client.on('ready', () => {
    console.log(`${client.user.tag} has login successfully`);
})

client.on('message', (message) => {
    if(message.author.bot) return;

    // console.log(`[${message.author.tag}]: ${message.content}`);
    if (message.content == 'hello') {
        message.channel.send('hello!');
    }

    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);

