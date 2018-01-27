var discord = require("discord.js");
var fs = require("fs");
var bot = new discord.Client();
var modCmds = new discord.Collection();

exports.run = async (path, botCmds) => {
	fs.readdir(path, (err, files) => {
		var jsfiles = files.filter(f => f.split('.').shift() !== "module", f => f.split('.').pop() === "js");
		if (jsfiles.length <= 0) {
			return console.log("\nNo commands found in this module...")
		}
		else { 
			console.log("\n" + jsfiles.length + " commands found in this module.")
		}
		jsfiles.forEach((f, i) => {
			delete require.cache[require.resolve("./" + f.split('.').shift())];
			var cmds = require("./" + f.split('.').shift());
			console.log("	Command " + f.split('.').shift() + " is loading..");
			modCmds.set(cmds.config.command, cmds);
			botCmds.set(cmds.config.command, cmds);
		})
	})
}

exports.config = {
	name: "ConnectFour",
	type: "Games",
	description :"A game module that allows playing customized games of Connect Four",
	commands: modCmds
};