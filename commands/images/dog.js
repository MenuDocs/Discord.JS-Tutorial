const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = {
	config: {
		name: "dog",
		description: "Shows a picture of n dog.",
		category: "miscellaneous",
		accessableby: "Members",
		aliases: ["doggo", "puppy"]
	},
	run: async (bot, message, args) => {
		const msg = await message.channel.send("Generating...");

		fetch(`https://dog.ceo/api/breeds/image/random`)
			.then(res => res.json())
			.then(body => {
				if (!body) return message.reply("whoops. Request didn't work too well, try again!");

				const embed = new MessageEmbed()
					.setColor(cyan)
					.setTitle("Dogs")
					.setImage(body.message)
					.setTimestamp()
					.setFooter(bot.user.username, bot.user.displayAvatarURL());

				msg.edit(embed);
			});
	}
};
