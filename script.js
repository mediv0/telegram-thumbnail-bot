// express starter template
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { exec } = require("child_process");
const { Telegraf } = require("telegraf");

exec("chmod +777 ./youtube-dl");
const getThumbnail = (url) => {
    return new Promise((resolve, reject) => {
        exec(`./youtube-dl --get-thumbnail ${url}`, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            resolve(stdout);
        });
    });
};

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("šŖ Welcome\n=============\nš¼ļø Paste your YouTube URL in the textbox."));
bot.on("text", (ctx) => {
    const url = ctx.update.message.text;
    getThumbnail(url)
        .then((thumbnail) => {
            ctx.reply("āØ Yay! Your image is ready.");
            ctx.reply("š Uploading your thumbnail...");
            ctx.replyWithPhoto({
                url: thumbnail.trim(),
                filename: "youtube-thumbnail"
            })
        })
        .catch((err) => {
            ctx.reply("š“ Woooah!, Invalid URL, try again");
        });
        ctx.reply("OK\nā Processing Your Request...\n======================");
});
bot.launch();


app.get("/", (req, res) => {
    // uptime robot
    res.send("hi :)")
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
