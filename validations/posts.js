const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
  title: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Name is required.",
      bail: true,
    },
    isString: {
      errorMessage: "Name must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Name should be at least 3 characters.",
      options: { min: 3 },
    },
  },
  //   slug: {
  //     in: ["body"],
  //     notEmpty: {
  //       errorMessage: "Slug is required.",
  //       bail: true,
  //     },
  //     isString: {
  //       errorMessage: "Slug must be a string.",
  //       bail: true,
  //     },
  //     isLength: {
  //       errorMessage: "Slug should be at least 3 characters.",
  //       options: { min: 3 },
  //     },
  //     custom: {
  //       options: async (value) => {
  //         const post = await prisma.post.findUnique({
  //           where: {
  //             slug: value,
  //           },
  //         });

  //         if (post) {
  //           throw new Error(`Slug ${value} already exists.`);
  //         }
  //       },
  //     },
  //   },
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Content is required.",
      bail: true,
    },
    isString: {
      errorMessage: "Content must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Content should be at least 10 characters.",
      options: { min: 10 },
    },
  },
  published: {
    in: ["body"],
    isBoolean: {
      errorMessage: "Published must be a boolean.",
      bail: true,
    },
  },
  categoryId: {
    in: ["body"],
    isInt: {
      errorMessage: "Category ID must be an integer.",
      bail: true,
    },
    custom: {
      options: async (value) => {
        const categoryId = parseInt(value);
        const category = await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        });

        if (!category) {
          throw new Error(`Category with ID ${categoryId} not found.`);
        }
        return true;
      },
    },
  },
  tags: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Tags is required.",
      bail: true,
    },
    isArray: {
      errorMessage: "Tags must be an array.",
      bail: true,
    },
    custom: {
      options: async (idsStrings) => {
        const ids = idsStrings.map((id) => parseInt(id));
        if (ids.length === 0) {
          throw new Error("Tags must have at least one item.");
        }
        const notIntegerId = ids.find((id) => isNaN(parseInt(id)));
        if (notIntegerId) {
          throw new Error("Tag ID must be an integer.");
        }
        const tags = await prisma.tag.findMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
        if (tags.length !== ids.length) {
          throw new Error("Some tags not found.");
        }
        return true;
      },
    },
  },
  // userId: {
  //   in: ["body"],
  //   isInt: {
  //     errorMessage: "User ID must be an integer.",
  //     bail: true,
  //   },
  //   custom: {
  //     options: async (value) => {
  //       const userId = parseInt(value);
  //       const user = await prisma.user.findUnique({
  //         where: {
  //           id: userId,
  //         },
  //       });

  //       if (!user) {
  //         throw new Error(`User with ID ${userId} not found.`);
  //       }
  //       return true;
  //     },
  //   },
  // },
};

module.exports = {
  bodyData,
};
