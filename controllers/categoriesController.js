const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: {
        name,
      },
    });
    res.json(category);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const index = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.json(category);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    res.json(category);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(category);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

module.exports = {
  store,
  index,
  show,
  update,
  destroy,
};
