var Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	/*var cmdList = "Listing all commands\n"
	bot.commands.forEach(function(element){
		cmdList = cmdList.concat(element.config.command + " - " + element.config.description + "\n");
	});
	var cmdList = {embed:{
		title:message.author.username,
		description:"Listing all commands !",
		color: Number("0x000000"),
		fields:[

		],
		timestamp: new Date(),
		footer: {
			text: bot.user.username,
			icon_url: bot.user.avatarURL
		}
	}}*/
	var cmdList = new Discord.RichEmbed()
	.setTitle("Listing all commands !")
	.setColor('#'+Math.floor(Math.random()*16777215).toString(16))
	.setFooter(bot.user.username, bot.user.avatarURL)
	.setThumbnail(bot.user.avatarURL)
	.setImage(bot.user.avatarURL)
	.setTimestamp()
	bot.commands.forEach(function(element){
		cmdList.addField("**usage : <" + element.config.command + ">**", "*"+element.config.description+"*")
	});


	message.channel.send(cmdList)
}

module.exports.config = {
	command: "help",
	description :"paste this"
};