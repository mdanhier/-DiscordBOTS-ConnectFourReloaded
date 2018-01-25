module.exports.run = async (bot, message, args) => {
	/*message.channel.send(".\n:record_button: :record_button: :record_button: :record_button: :record_button: :record_button: :record_button:\n" +
		":record_button: :record_button: :record_button: :record_button: :record_button: :record_button: :record_button:\n" +
		":record_button: :record_button: :record_button: :record_button: :record_button: :record_button: :record_button:\n" +
		":record_button: :record_button: :record_button: :record_button: :record_button: :record_button: :record_button:\n" +
		":record_button: :record_button: :record_button: :record_button: :record_button: :record_button: :record_button:\n" +
		":record_button: :record_button: :record_button: :record_button: :record_button: :record_button: :record_button:");*/
		message.channel.send("Room created");
};

module.exports.config = {
	command: "create",
	description :"simply create a room",
	args: 0
};