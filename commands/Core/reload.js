var discord = require("discord.js");
var module = require("./module.js");
var loadPlugins = require("../../bot.js");

exports.run = async (bot, message, args) => {
	loadPlugins();
	message.channel.send("All commands reloaded");
}

exports.config = {
	command: "reload",
	description :"reload commands",
	module: module.config
};