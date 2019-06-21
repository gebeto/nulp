const express = require('express');
const requireRoute = require('../utils/requires').requireRoute;
const fabrics = require('../utils/methodsFabrics');


const authRouter = express.Router();
authRouter.post('/login', requireRoute('auth', 'login'));


const apiRouter = express.Router();
apiRouter.use('/customers', fabrics.createReadOnlyRouter('customers'));
apiRouter.use('/orders', fabrics.createRouter('orders'));
apiRouter.use('/employees', fabrics.createReadOnlyRouter('employees'));
apiRouter.use('/logs', fabrics.createReadOnlyRouter('logs'));
apiRouter.use('/roles', fabrics.createRouter('roles'));
apiRouter.use('/users', fabrics.createRouter('users'));
apiRouter.use('/doors', fabrics.createRouter('doors'));
apiRouter.use('/colors', fabrics.createRouter('colors'));
apiRouter.use('/materials', fabrics.createRouter('materials'));
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;