const loadPlugins = require("../../bot.js");

module.exports.run = async (bot, message, args) => {
	loadPlugins();
	message.channel.send("All commands reloaded");
};

module.exports.config = {
	command: "reload",
	description :"reload commands",
	args: 0
};