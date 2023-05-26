const { SlashCommandBuilder } = require('discord.js');
const Catty = require('../../catty/Catty');
const catty = new Catty();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers the user in the Catty memory.'),
	async execute(interaction) {
        await catty.register(interaction);
		return interaction.reply('Meow! You have been registered!');
	},
};