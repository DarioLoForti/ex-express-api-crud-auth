const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

async function main() {
  const posts = [];

  for (let i = 0; i < 50; i++) {
    const title = faker.lorem.words(2);
    const slug = title.toLowerCase().split(" ").join("-");
    const content = faker.lorem.paragraphs(3);
    const published = true;

    posts.push({
      title,
      slug,
      content,
      published,
    });
  }

  await prisma.post.createMany({
    data: posts,
    skipDuplicates: true,
  });

  console.log("Database popolato con 50 post.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
