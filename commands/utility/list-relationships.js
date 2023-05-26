const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Catty = require('../../catty/Catty');


const catty = new Catty();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('list-relationships')
        .setDescription('Lists all relationships.'),
    async execute(interaction) {
        try {
            const relationships = await catty.listRelationships();

            if (relationships.length === 0) {
                interaction.reply('No relationships found.');
            } else {
                const embed = new EmbedBuilder()
                    .setTitle('Relationships that are registered:')
                    .setAuthor({ name: 'Catty', url: 'https://discord.js.org' })
                    .setColor(0xFFFF00)
                    .setThumbnail('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/43ebe86a-38b9-4b7f-a6ac-c9442e874c7e/dcb00sr-fab8e28c-c4d0-4bd9-86d1-d85cfd6cda22.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQzZWJlODZhLTM4YjktNGI3Zi1hNmFjLWM5NDQyZTg3NGM3ZVwvZGNiMDBzci1mYWI4ZTI4Yy1jNGQwLTRiZDktODZkMS1kODVjZmQ2Y2RhMjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.IhuIKNnll4W0I--FM-zzHWlt5-sb4uejRBj2FqOgfNk')
                    .addFields({
                        name: ' ',
                        value: ' ',
                        inline: false,
                    })

                relationships.forEach(relationship => {
                    embed.addFields({
                        name: relationship.name,
                        value: relationship.description,
                        inline: false,

                    });

                    embed.addFields({
                        name: ' ',
                        value: ' ',
                        inline: false,
                    })

                });

                embed.setFooter({ text: 'Type /create-relationship to add more relationships!', iconURL: 'https://cdn.midjourney.com/0f635e52-4fc5-4497-b951-7fb8b926b80c/0_1.png' });
                interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error listing relationships:', error);
            interaction.reply('There was an error listing the relationships.');
        }
    },
};
