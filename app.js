const { PORT } = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
//const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const estateRouter = require("./routes/estate");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "25mb", extended: true }));
app.use(bodyParser.json({ limit: "25mb" }));

app.use("/api", estateRouter);
//app.use("/bohios-pro", createProxyMiddleware({ target: `http://localhost:${PORT}`, changeOrigin: true }));

module.exports = app;