const express = require('express');
const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
const { authRouter } = require('./src/controller/autentication');
const { ExpenseRouter } = require('./src/controller/expense');
const mongoose = require('mongoose');
require('dotenv').config();

server.use(authRouter);
server.use(ExpenseRouter);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(8080);
  })
  .catch((err) => {
    throw new Error(err);
  });
