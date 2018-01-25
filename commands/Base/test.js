module.exports.run = async (bot, message, args) => {
	message.channel.send({embed:{
		title:"Google !",
		description:"Gooooooooooooooooooooooogle !",
		url:"https://google.fr",
		color: Number("0x" + args[0]),
		fields:[
		{
			name:"salut les mecs",
			value:"*I have **ok***, [proof](https://pics.me.me/me-my-remot-my-tv-infrared-rays-from-my-tv-22176472.png')",
			inline: true
		}
		],
		timestamp: new Date(),
		footer: {
			text: "Pied-de-page ok",
			icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Gay_flag.svg/190px-Gay_flag.svg.png"
		}
	}})
};

module.exports.config = {
	command: "test",
	description: "what did you expect ? It's a test",
	args: 1
};