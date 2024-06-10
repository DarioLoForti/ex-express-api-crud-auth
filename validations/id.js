const idValidator = {
  id: {
    in: ["params"],
    isInt: {
      errorMessage: "ID must be an integer.",
      bail: true,
    },
  },
};

module.exports = {
  idValidator,
};
