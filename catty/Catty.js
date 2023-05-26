const prisma = require('./prismaClient');
const { registerUser } = require('./user');
const { registerRelationship, listRelationships } = require('./relationship');
const { relate, listRelationshipsForUser } = require('./relationshipItem');

class Catty {
  constructor() {
    this.prisma = prisma;
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
          email: interaction.user.email,
        },
      });
    }
  }

  async registerUser(user) {
    await registerUser(user);
  }

  async registerRelationship(name, description, exclusive, unilateral) {
    await registerRelationship(name, description, exclusive, unilateral);
  }

  async listRelationships() {
    return await listRelationships();
  }

  async relate(interaction) {
    const target = interaction.options.getUser('user');
    const relationship = interaction.options.getString('relationship');
    const sender = await this.prisma.user.findUnique({
      where: {
        discordId: interaction.user.id,
      },
    });

    await relate(sender, target, relationship);
  }

  async listRelationshipsForUser(interaction) {
    const sender = await this.prisma.user.findUnique({
      where: {
        discordId: interaction.user.id,
      },
    });

    return await listRelationshipsForUser(sender);
  }
}

module.exports = Catty;
