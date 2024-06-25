const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerData = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "email is a required field.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address.",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const user = await prisma.user.findUnique({
          where: { email: value },
        });
        if (user) {
          throw new Error(`user with email ${value} already exists`);
        }
        return true;
      },
    },
  },
  name: {
    in: ["body"],
    options: true,
    isString: {
      errorMessage: "Name must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Name must be at least 3 characters long.",
      options: { min: 3 },
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "Password must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Password must be at least 8 characters long.",
      options: { min: 8 },
    },
  },
};

const loginData = {
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email is a required field.",
      bail: true,
    },
    isEmail: {
      errorMessage: "Email must be a valid email address.",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "Password must be a string.",
    },
  },
};

module.exports = {
  registerData,
  loginData,
};
