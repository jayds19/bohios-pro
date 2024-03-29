const { PORT } = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
//const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const estateRouter = require("./routes/estate");
const tourRouter = require("./routes/tour");
const promotedRouter = require("./routes/promoted");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(bodyParser.json({ limit: "25mb" }));
app.use(express.static("public"));

app.use("/api", estateRouter);
app.use("/api", tourRouter);
app.use("/api", promotedRouter);
app.use("/api", blogRouter);
app.use("/api", userRouter);

//app.use("/bohios-pro", createProxyMiddleware({ target: `http://localhost:${PORT}`, changeOrigin: true }));
module.exports = app;
