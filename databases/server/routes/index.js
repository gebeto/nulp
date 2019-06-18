const express = require('express');
const requireRoute = require('./utils').requireRoute;


const usersRouter = express.Router();
usersRouter.post('/get', requireRoute('users', 'get'));
usersRouter.post('/getAll', requireRoute('users', 'getAll'));

const authRouter = express.Router();
authRouter.post('/login', requireRoute('auth', 'login'));



const apiRouter = express.Router();
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;