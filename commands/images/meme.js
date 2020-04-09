const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = {
	config: {
		name: "meme",
		description: "Shows a random meme.",
		category: "images",
		accessableby: "Members"
	},
	run: async (bot, message, args) => {
		const msg = await message.channel.send("Generating...");

		fetch("https://apis.duncte123.me/meme")
			.then(res => res.json())
			.then(body => {
				if (!body || !body.data.image) return message.reply("whoops. Request didn't work too well, try again!");

				const embed = new MessageEmbed()
					.setColor(cyan)
					.setTitle("Meme")
					.setImage(body.data.image)
					.setTimestamp()
					.setFooter(bot.user.username, bot.user.displayAvatarURL());

				if (body.data.title) embed.setTitle(body.data.title).setURL(body.data.url);

				msg.edit(embed);
			});
	}
};
