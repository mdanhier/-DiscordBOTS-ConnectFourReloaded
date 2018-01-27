var discord = require("discord.js");
var module = require("./module.js");

exports.run = async (bot, message, args) => {
	message.channel.send("gg2")
}

exports.config = {
	command: "test",
	description :"what did you expect ? It's a test",
	module: module.config
};