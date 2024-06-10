const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: " 404 Route Not found" });
};

module.exports = notFoundHandler;
