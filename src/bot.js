require('dotenv').config();

const search = require('youtube-search');
const opts = {
    maxResults: 1,
    key: process.env.YOUTUBE_BOT_KEY
  };

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

        if (CMD_NAME == 'ping') {
            message.channel.send('pong');
        }
        if (CMD_NAME == 'help') {
            message.reply('\n' +
            'Hi! you can use the following commands:' + '\n' +
            '!yt => search for youtube videos.' + '\n' +
            'e.x !yt pokemon');
        }

        if (CMD_NAME == 'yt') {
            search(args.join(' '), opts, function(err, results) {
                if(err) return console.log(err);
              message.channel.send(results[0].link);
              });
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);

