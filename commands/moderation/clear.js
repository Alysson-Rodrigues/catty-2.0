// make a command to clear messages in a channel

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears messages from the channel.')
		.addIntegerOption(option => option.setName('amount').setDescription('The amount of messages to clear')),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');
		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true });
		}
        await interaction.channel.bulkDelete(amount, true).then(
            interaction.reply({ content: 'Sucessfully cleared', ephemeral: true })
        ).catch(err => {
            console.error(err);
            interaction.reply({ content: 'There was an error trying to clear messages in this channel!', ephemeral: true });
        }
        );
	},
};