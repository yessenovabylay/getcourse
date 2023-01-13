const express = require("express");
const app = express();

const { isAuth } = require("../middlewares/auth")

const user = require("./user");

app.use('/api/user', user);

module.exports = app;