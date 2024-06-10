const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
  const { name } = req.body;

  try {
    const tag = await prisma.tag.create({
      data: {
        name,
      },
    });
    res.json(tag);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const index = async (req, res) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const show = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.json(tag);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const tag = await prisma.tag.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    res.json(tag);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await prisma.tag.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(tag);
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
