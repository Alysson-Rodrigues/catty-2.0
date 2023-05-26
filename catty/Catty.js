
const { PrismaClient } = require('@prisma/client');

class Catty {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async register(interaction) {
        const sender = await this.prisma.user.findUnique({
            where: {
                discordId: interaction.user.id,
            },
        });
        if (!sender) {
            await this.prisma.user.create({
                data: {
                    discordId: interaction.user.id,
                    username: interaction.user.username,
                    discriminator: interaction.user.discriminator,
                    avatar: interaction.user.avatar,
                    bot: interaction.user.bot,
                    system: interaction.user.system,
                    mfa_enabled: interaction.user.mfaEnabled,
                    locale: interaction.user.locale,
                    verified: interaction.user.verified,
                    email: interaction.user.email
                },
            });
        }
    }

    async registerUser(user) {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    discordId: user.id,
                },
            });

            if (existingUser) {
                return;
            }

            await this.prisma.user.create({
                data: {
                    discordId: user.id,
                    username: user.username,
                    discriminator: user.discriminator,
                    avatar: user.avatar,
                    bot: user.bot,
                    system: user.system,
                    locale: user.locale,
                },
            });

    }

    async registerRelationship(name, description, exclusive, unilateral) {
        try {
            await this.prisma.relationship.create({
                data: {
                    name,
                    description,
                    exclusive,
                    unilateral,
                },
            });
        } catch (error) {
            console.error('Error registering relationship:', error);
            throw error;
        }
    }

    async listRelationships() {
        try {
          const relationships = await this.prisma.relationship.findMany();
          return relationships;
        } catch (error) {
          console.error('Error listing relationships:', error);
          throw error;
        }
      }

    async relate (interaction) {
        const target = interaction.options.getUser('user');
        const relationship = interaction.options.getString('relationship');

        if (!relationship) {
            throw new Error('You must provide a relationship to relate to.');
        }

        const sender = await this.prisma.user.findUnique({
            where: {
                discordId: interaction.user.id,
            },
        });

        const targetUser = await this.prisma.user.findMany({
            where: {
                discordId: target.id,
            },
        });

        await this.registerUser(target);


        const relationshipData = await this.prisma.relationship.findMany({
            where: {
                name: relationship,
            },
        });

        if (!relationshipData) {
            throw new Error('The relationship you provided does not exist.');
        }

        await this.prisma.relationshipItem.create({
            data: {
                relationshipId: relationshipData[0].id,
                userId: sender.discordId,
                targetUserId: targetUser[0].discordId,
            },
        });


            await this.prisma.relationshipItem.create({
                data: {
                    relationshipId: relationshipData[0].id,
                    userId: targetUser[0].discordId,
                    targetUserId: sender.discordId,
                },
            });
    }
}

module.exports = Catty;
