const { de } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.json(user);
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const eventError = new Error("Invalid email or password");
    if (!user) {
      throw eventError;
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw eventError;
    }

    const token = generateeToken({
      email: user.email,
      name: user.name,
    });

    delete user.password;
    delete user.id;

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ error: "An error occurred" });
  }
};

module.exports = {
  register,
  login,
};
