const prisma = require('./prismaClient');

async function registerRelationship(name, description, exclusive, unilateral) {
  try {
    await prisma.relationship.create({
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

async function listRelationships() {
  try {
    const relationships = await prisma.relationship.findMany();
    return relationships;
  } catch (error) {
    console.error('Error listing relationships:', error);
    throw error;
  }
}

module.exports = {
  registerRelationship,
  listRelationships,
};
