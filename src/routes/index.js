const express = require("express");
const app = express();

const { isAuth } = require("../middlewares/auth")

const user = require("./user.js");
const category = require('./category.js')

app.use('/api/user', user);
app.use('/api/category', category);

module.exports = app;