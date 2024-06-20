const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const deleteImage = require("../utils/deleteImage.js");
const { tr } = require("@faker-js/faker");
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const store = async (req, res) => {
  const { title, content, tags, categoryId, userId } = req.body;

  console.log("Dati ricevuti:", req.body);

  const slug = title.toLowerCase().split(" ").join("-");

  const data = {
    title,
    content,
    slug,
    published: req.body.published ? true : false,
    tags: {
      connect: tags.map((id) => ({ id: parseInt(id) })),
    },
  };

  if (req.file) {
    data.image = `${HOST}:${port}/image/${req.file.filename}`;
  }

  if (categoryId) {
    data.categoryId = parseInt(categoryId);
  }

  if (userId) {
    data.userId = parseInt(UserId);
  }
  try {
    const post = await prisma.post.create({
      data,
    });
    res.json(post);
  } catch (error) {
    if (req.file) {
      deleteImage("image", req.file.filename);
    }
    res.json({ error: "An error occurred" });
  }
};

const index = async (req, res) => {
  try {
    const where = {};
    const { published, search, page = 1, limit = 10 } = req.query;

    if (published) {
      where.published = published === "true";
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
          },
        },
        {
          content: {
            contains: search,
          },
        },
      ];
    }

    const totalPosts = await prisma.post.count({
      where,
    });

    const totalPages = Math.ceil(totalPosts / limit);

    const offset = (page - 1) * limit;

    const posts = await prisma.post.findMany({
      where,
      take: parseInt(limit),
      skip: offset,
      include: {
        category: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    res.json({ posts, totalPages, currentPage: parseInt(page), totalPosts });
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const show = async (req, res) => {
  try {
    const slug = req.params.slug;
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    if (post) {
      res.json(post);
    } else {
      throw new Error(`Post with slug ${slug} not found.`);
    }
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const update = async (req, res) => {
  try {
    const slug = req.params.slug;
    const { title, content, published, userId, categoryId, tags } = req.body;
    const newSlug = title.toLowerCase().split(" ").join("-");

    const data = {
      title,
      slug: newSlug,
      content,
      published,
      tags: {
        set: tags.map((id) => ({ id: id })),
      },
    };

    if (req.file) {
      data.image_path = `${HOST}:${port}/image/${req.file.filename}`;
    }

    if (categoryId) {
      data.categoryId = categoryId;
    }

    if (userId) {
      data.userId = userId;
    }

    const post = await prisma.post.update({
      where: {
        slug,
      },
      data,
    });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.json({ error: "An error occurred" });
  }
};

const destroy = async (req, res) => {
  try {
    const { slug } = req.params;
    await prisma.post.delete({
      where: {
        slug,
      },
    });

    res.json(`Post with slug ${slug} has been deleted`);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
