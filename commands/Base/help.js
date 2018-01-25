module.exports.run = async (bot, message, args) => {
	var cmdList = "Commands list:\n"
	bot.commands.forEach(function(element){
		cmdList = cmdList.concat(element.config.command + " - " + element.config.description + "\n");
	});
	message.reply("Sent in DMs");
	message.author.send(cmdList);
};

module.exports.config = {
	command: "help",
	description :"paste this",
	args: 0
};