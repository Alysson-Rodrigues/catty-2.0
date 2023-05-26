const prisma = require('./prismaClient');

async function registerUser(user) {
  const existingUser = await prisma.user.findUnique({
    where: {
      discordId: user.id,
    },
  });

  if (existingUser) {
    return;
  }

  await prisma.user.create({
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

module.exports = {
  registerUser,
};
