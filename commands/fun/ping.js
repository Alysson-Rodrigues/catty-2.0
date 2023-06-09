const { SlashCommandBuilder } = require('discord.js');
const Catty = require('../../catty/Catty');
const catty = new Catty();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};