const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Business' },
        { name: 'Computer Science' },
        { name: 'Design' },
        { name: 'Engineering' },
        { name: 'Health & Fitness' },
        { name: 'Lifestyle' },
        { name: 'Marketing' },
        { name: 'Music' },
        { name: 'Soft Skill' },
        { name: 'Photography & Video' },
      ],
    });
    console.log('Seeded the database categories successfully.');
  } catch (error) {
    console.error('Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
