const express = require("express");

const postRouter = require("./post/post-router");

const server = express();
server.use(express.json());

server.use("/api/posts", postRouter);

module.exports = server;