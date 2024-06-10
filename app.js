const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();

const postsRouter = require("./routers/postsRouter");
const categoriesRouter = require("./routers/categoriesRouter");
const tagsRouter = require("./routers/tagsRouter");
const authRouter = require("./routers/authRouter");

const errorHandler = require("./middleware/errorHandler");
const notFoundHandler = require("./middleware/notFoundHandler");

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);
app.use("/auth", authRouter);

app.use(errorHandler);

app.use(notFoundHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
