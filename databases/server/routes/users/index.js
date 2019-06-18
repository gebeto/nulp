const express = require('express');
const requireRoute = require('../utils').requireRoute;

const usersRouter = express.Router();
usersRouter.get('/get', requireRoute('users', 'get'));
usersRouter.get('/getAll', requireRoute('users', 'getAll'));

module.exports = usersRouter;