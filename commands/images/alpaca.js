const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = {
	config: {
		name: "alpaca",
		description: "Shows a picture of an alpaca.",
		category: "images",
		accessableby: "Members"
	},
	run: async (bot, message, args) => {
		const msg = await message.channel.send("Generating...");

		fetch("https://apis.duncte123.me/alpaca")
			.then(res => res.json())
			.then(body => {
				if (!body) return message.reply("whoops. Request didn't work too well, try again!");

				const embed = new MessageEmbed()
					.setColor(cyan)
					.setTitle("Alpaca")
					.setImage(body.data.file)
					.setTimestamp()
					.setFooter(bot.user.username, bot.user.displayAvatarURL());

				msg.edit(embed);
			});
	}
};
