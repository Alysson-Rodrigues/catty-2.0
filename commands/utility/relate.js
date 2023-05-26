const { SlashCommandBuilder } = require('discord.js');
const Catty = require('../../catty/Catty');
const catty = new Catty();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('relate')
		.setDescription('Registers a relationship between you and another person.')
        .addUserOption(option => option.setName('user').setDescription('The user to relate to.').setRequired(true))
        .addStringOption(option => option.setName('relationship').setDescription('The relationship to relate to.').setRequired(true)),
	async execute(interaction) {
        await catty.relate(interaction);
        return interaction.reply('Meow! You have been related!');
	},
};