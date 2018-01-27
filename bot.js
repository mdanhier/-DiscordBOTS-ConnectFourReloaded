var discord = require("discord.js");
var fs = require("fs");
var bot = new discord.Client();
var config = require("./config.json");
var pluginsDir = "./commands/";
bot.commands = new discord.Collection();
bot.modules = new discord.Collection();
module.exports = loadPlugins;

function getPluginsDir() {
	return fs.readdirSync(pluginsDir).filter(function (file) {
		return fs.statSync(pluginsDir+"/"+file).isDirectory();
	});
}

function loadPlugins() {
	getPluginsDir().forEach(function(element){
		fs.readdir(pluginsDir.concat(element + "/"), (err, files) => {
			if(err) console.error(err);
			path = pluginsDir.concat(element + "/")
			var jsfiles = files.filter(f => f === "module.js");
			if (jsfiles.length <= 0) {
				return console.log("\nNo module found in " + element + " folder...")
			}
			else { 
				console.log("Module found in " + element + " folder.") 
				delete require.cache[require.resolve(path + jsfiles)];
				var module = require(path + jsfiles);
				module.run(path, bot.commands);
				bot.modules.set(module.config.name, module);
			}
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

bot.on("ready", function (message) {
	bot.user.setActivity("lolatu");
	console.log("Bot is online ! ");
});


bot.on("message", message => {
	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;

	var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	var cmd = bot.commands.get(args.shift().toLowerCase());

	if (cmd) {
		if(checkArgs(cmd.config.args, message, args)) cmd.run(bot, message, args);
	}
})