const express = require('express');
const requireRoute = require('./utils').requireRoute;


const usersRouter = express.Router();
usersRouter.post('/get', requireRoute('users', 'get'));
usersRouter.post('/getAll', requireRoute('users', 'getAll'));
usersRouter.post('/update', requireRoute('users', 'update'));

const doorsRouter = express.Router();
doorsRouter.post('/get', requireRoute('doors', 'get'));
doorsRouter.post('/getAll', requireRoute('doors', 'getAll'));
doorsRouter.post('/update', requireRoute('doors', 'update'));

const authRouter = express.Router();
authRouter.post('/login', requireRoute('auth', 'login'));



const apiRouter = express.Router();
apiRouter.use('/users', usersRouter);
apiRouter.use('/doors', doorsRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;