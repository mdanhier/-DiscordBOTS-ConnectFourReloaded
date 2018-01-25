var Discord = require("discord.js");
var fs = require("fs");
var bot = new Discord.Client();
var config = require("./config.json");
var plugin_dir = "./commands/";
bot.commands = new Discord.Collection();
module.exports = loadPlugins;

function getPluginsDir() {
	return fs.readdirSync(plugin_dir).filter(function (file) {
		return fs.statSync(plugin_dir+"/"+file).isDirectory();
	});
}

function loadPlugins() {
	getPluginsDir().forEach(function(element){
		fs.readdir(plugin_dir.concat(element + "/"), (err, files) => {
			if(err) console.error(err);
			path = plugin_dir.concat(element + "/")
			var jsfiles = files.filter(f => f.split('.').pop() === "js");
			if (jsfiles.length <= 0) { return console.log("\nNo commands found in " + element + " plugin...")}
				else { console.log("\n" + jsfiles.length + " commands found in " + element + " plugin.")}
					jsfiles.forEach((f, i) => {
						delete require.cache[require.resolve(path + f)];
						var cmds = require(path + f);
						console.log("	Command " + f + " is loading..");
						bot.commands.set(cmds.config.command, cmds);
					})
			})
	})
}

function checkArgs(cmdArgs, message, args){
	var mustArg = 0;
	if(!cmdArgs){
		if(!args.length){
			message.channel.send("gg");
			return true;
		}
		else{
			message.channel.send("aucun argument n'est à spécifier.")
			return;
		}
	}
	if(cmdArgs){
		cmdArgs.forEach(function(element){
			if(!element.optional)
				mustArg++;
		})
	}
}

loadPlugins();

bot.login(config.token);

bot.on("ready", function () {
	bot.user.setActivity("lolatu");
	console.log("ON");
});

bot.on("message", message => {
	if (message.author.bot) return;
	/*if(Math.floor(Math.random() * 3) == 0)
		var rdm = Math.floor(Math.random() * 5)
		if(rdm == 0)
			message.channel.send("no")
		if(rdm == 1)
			message.channel.send("k")
		if(rdm == 2)
			message.channel.send("fuck you")
		if(rdm == 3)
			message.channel.send("that's gay")
		if(rdm == 4)
			message.channel.send("cool")*/

	if (message.content.indexOf(config.prefix) !== 0) return;

	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	var cmd = bot.commands.get(args.shift().toLowerCase());

	if (cmd) {
		if(checkArgs(cmd.config.args, message, args)) cmd.run(bot, message, args);
	}
})