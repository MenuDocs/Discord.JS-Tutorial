const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const fetch = require("node-fetch");

module.exports = {
	config: {
		name: "cat",
		description: "Shows a picture of a cat",
		category: "miscellaneous",
		accessableby: "Members",
		aliases: ["catto"]
	},
	run: async (bot, message, args) => {
		let msg = await message.channel.send("Generating...");

		fetch(`http://aws.random.cat/meow`)
			.then(res => res.json())
			.then(body => {
				if (!body) return message.reply("whoops. Request didn't work too well, try again!");

				const embed = new MessageEmbed()
					.setColor(cyan)
					.setTitle("Cat")
					.setImage(body.file)
					.setTimestamp()
					.setFooter(bot.user.username, bot.user.displayAvatarURL());

				msg.edit(embed);
			});
	}
};
