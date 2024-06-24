const slugValidator = {
  slug: {
    in: ["params"],
    notEmpty: {
      errorMessage: "Slug is required.",
      bail: true,
    },
    isString: {
      errorMessage: "Slug must be a string.",
      bail: true,
    },
    isLength: {
      errorMessage: "Slug should be at least 3 characters.",
      options: { min: 3 },
    },
    toString: true,
  },
};

module.exports = {
  slugValidator,
};
