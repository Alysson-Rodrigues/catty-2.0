const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');

        if (member) {
            await member.kick();
            return interaction.reply(`${member.user.username} was kicked.`);
        }

        return interaction.reply('That member could not be kicked.');
		
	},
};