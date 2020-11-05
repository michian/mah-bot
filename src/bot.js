require('dotenv').config();

const search = require('youtube-search');
const request = require("request");

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
            message.reply('```ini\n' +
            'Hi! You can use the following commands ㋡ ' + '\n\n' +
            '[ !youtube    => search for youtube videos ]' + '\n' +
            '[ !quote      => random quote ]' + '\n' +
            '[ !quote tech => random quote ]'
            + '\n```');
        }

        if (CMD_NAME == 'youtube') {
            search(args.join(' '), opts, function(err, results) {
                if(args.length == 0) {
                    message.reply('```\nuse this format\n'
                    + '!youtube pokemon song```')
                } else {
                    message.channel.send(results[0].link);
                };
              });
        }

        if (CMD_NAME == 'quote') {
            if(args[0] == 'tech') {
                request.get("http://quotes.stormconsultancy.co.uk/random.json",
                (error, response, body) => {
                    if(error) {
                        return console.dir(error);
                    }
                    const quote = (JSON.parse(body))['quote'];
                    const resp = "```" + quote + "```";
                    message.channel.send(resp);
                });
            } else {
                request.get("https://api.forismatic.com/api/1.0/?method=getQuote&format=json&param=ms&lang=en",
                (error, response, body) => {
                    if(error) {
                        return console.dir(error);
                    }
                    const quote = (JSON.parse(body))['quoteText'];
                    const resp = "```" + quote + "```";
                    message.channel.send(resp);
                });
            }
        }
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);

