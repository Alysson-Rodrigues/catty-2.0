const { SlashCommandBuilder } = require('@discordjs/builders');
const Catty = require('../../catty/Catty');
const catty = new Catty();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register-relationship')
    .setDescription('Registers a relationship in the database.')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the relationship.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('description')
        .setDescription('The description of the relationship.')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('exclusive')
        .setDescription('Whether the relationship can happen only with one person at a time.')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option.setName('unilateral')
        .setDescription('For unilateral relationships, whether the relationship can only be initiated by one person.')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const name = interaction.options.getString('name');
      const description = interaction.options.getString('description');
      const exclusive = interaction.options.getBoolean('exclusive');
      const unilateral = interaction.options.getBoolean('unilateral');
      await catty.registerRelationship(name, description, exclusive, unilateral);
      interaction.reply(`Relationship "${name}" registered successfully.`);
    } catch (error) {
      console.error('Error registering relationship:', error);
      interaction.reply('There was an error registering the relationship.');
    }
  },
};