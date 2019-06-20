const express = require('express');
const requireRoute = require('../utils/requires').requireRoute;
const fabrics = require('../utils/methodsFabrics');


const authRouter = express.Router();
authRouter.post('/login', requireRoute('auth', 'login'));


const apiRouter = express.Router();
apiRouter.use('/users', fabrics.createRouter('users'));
apiRouter.use('/doors', fabrics.createRouter('doors'));
apiRouter.use('/roles', fabrics.createRouter('roles'));
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;