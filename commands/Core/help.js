var discord = require("discord.js");
var module = require("./module.js");

exports.run = async (bot, message, args) => {
	var actualModule = null;
	var cmdList = new discord.RichEmbed()
	.setTitle("Listing all commands !")
	.setColor(Math.floor(Math.random()*16777215))
	.setFooter(bot.user.username, bot.user.avatarURL)
	.setThumbnail(bot.user.avatarURL)
	.setImage(bot.user.avatarURL)
	.setTimestamp()
	bot.modules.forEach(function(element){			
		cmdList.addField("__**" + element.config.name + " - " + element.config.type + "**__", "__*" + element.config.description + "*__")
		console.log(element.config.commands);
		element.config.commands.forEach(function(subElement){
			cmdList.addField("**usage : <" + subElement.config.command + ">**", "*" + subElement.config.description + "*")
		});
	});


	message.channel.send(cmdList)
}

exports.config = {
	command: "help",
	description :"paste this",
	module: module.config
};