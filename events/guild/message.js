const { prefix } = require("../../botconfig.json");

module.exports = (bot, message) => {
	if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;

	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();
	const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
	if (commandfile) commandfile.run(bot, message, args);
};
