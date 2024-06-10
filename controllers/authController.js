const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const generateToken = require("../utils/generateToken.js");
const { hashPassword, comparePassword } = require("../utils/password.js");
const deleteImage = require("../utils/deleteImage.js");
require("dotenv").config();
const { PORT, HOST } = process.env;
const port = PORT || 3000;

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const data = {
      email,
      name,
      password: await hashPassword(password),
    };

    if (req.file) {
      data.image_path = `${HOST}:${port}/uploads/${req.file.filename}`;
    }

    const user = await prisma.user.create({ data });

    const token = generateToken({
      email: user.email,
      name: user.name,
    });

    delete user.id;
    delete user.password;

    res.json({ token, data: user });
  } catch (error) {
    if (req.file) {
      deleteImage(req.file.filename);
    }
    res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const eventualeErrore = new Error("Invalid email or password");

    if (!user) {
      throw eventualeErrore;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw eventualeErrore;
    }

    const token = generateToken({
      email: user.email,
      name: user.name,
    });

    delete user.id;
    delete user.password;

    res.json({ token, data: user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};
