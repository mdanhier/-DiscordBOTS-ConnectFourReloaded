var discord = require("discord.js");
var module = require("./module.js");
var loadPlugins = require("../../bot.js")

exports.run = async (bot, message, args) => {
		message.channel.send("Room created");
};

exports.config = {
	command: "create",
	description :"simply create a room",
	module: module.config
};