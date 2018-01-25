var Discord = require("discord.js");
var fs = require("fs");
var bot = new Discord.Client();
var config = require("./config.json");
var plugin_dir = "./commands/";
bot.commands = new Discord.Collection();

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
			if (jsfiles.length <= 0) { return console.log("No commands found in " + element + " plugin...")}
				else { console.log(jsfiles.length + " commands found in " + element + " plugin.")}
					jsfiles.forEach((f, i) => {
						delete require.cache[require.resolve(path + f)];
						var cmds = require(path + f);
						console.log("	Command " + f + " is loading..");
						bot.commands.set(cmds.config.command, cmds);
					});
			});
	})
}

module.exports = loadPlugins;

loadPlugins();

bot.login(config.token);

bot.on("ready", function () {
	bot.user.setActivity("lolatu");
	console.log("ON");
});

bot.on("message", message => {
	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;

	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	var cmd = bot.commands.get(args.shift().toLowerCase());

	if (cmd)
		if(args.length < cmd.config.args){
			message.channel.send("no, lack of args");
			return;
		}
		if(args.length > cmd.config.args){
			message.channel.send("no, too many args");
			return;
		}
		cmd.run(bot, message, args);
	});