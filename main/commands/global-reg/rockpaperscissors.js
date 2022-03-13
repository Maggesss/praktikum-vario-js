const { SlashCommandBuilder } = require("@discordjs/builders");

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rockpaperscissors")
		.setDescription("Play rock-paper-scissors against me!")
		.addStringOption(option => option
            .setName("choice")
            .setDescription("Put 'rock', 'paper' or 'scissors'.")),
            
	async execute(interaction) {
		const choice_user = interaction.options.getString("choice");
        const choice_bot = getRndInteger(0, 2);
        const choice_array = ["rock", "paper", "scissors"];
        try { 
            if (choice_user.toLowerCase() == ("rock" || "paper" || "scissors")) {
                if ((choice_user.toLowerCase() && choice_array[choice_bot]) == ("rock" || "paper" || "scissors")) {
                    return interaction.reply(`Your choice was: **${choice_user.toLowerCase()}**. The bot chose **${choice_array[choice_bot]}**! **Tie!**`);
                } else if (((choice_user.toLowerCase() == "rock") && (choice_bot == 2)) || ((choice_user.toLowerCase() == "paper") && (choice_bot == 0)) || ((choice_user.toLowerCase() == "scissors") && (choice_bot == 1))) {
                    return interaction.reply(`Your choice was: **${choice_user.toLowerCase()}**. The bot chose **${choice_array[choice_bot]}**! **You win!**`);
                } else if (((choice_user.toLowerCase() == "rock") && (choice_bot == 1)) || ((choice_user.toLowerCase() == "paper") && (choice_bot == 2)) || ((choice_user.toLowerCase() == "scissors") && (choice_bot == 0))) {
                    return interaction.reply(`Your choice was: **${choice_user.toLowerCase()}**. The bot chose **${choice_array[choice_bot]}**! **You lose!**`);
                };
            } else { return interaction.reply({ content: "Not a valid input!", ephemeral: true }) };
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        };
	},
};