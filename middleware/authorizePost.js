// src/middleware/authorizePost.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authorizePost = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: { userId: true },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ error: "It's not your post" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = authorizePost;
