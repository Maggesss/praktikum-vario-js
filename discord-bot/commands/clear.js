const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("clear up to 99 messages.")
		.addIntegerOption(option => option.setName("amount").setDescription("Number of messages to clear")),
	async execute(interaction) {
		const amount = interaction.options.getInteger("amount");

		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: "You need to input a number between 1 and 99.", ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: "There was an error trying to clear messages in this channel!", ephemeral: true });
		});

		return interaction.reply({ content: `Successfully cleared \`${amount}\` messages.`, ephemeral: true });
	},
};