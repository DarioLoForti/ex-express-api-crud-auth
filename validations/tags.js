const bodyData = {
  name: {
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
};

module.exports = {
  bodyData,
};
