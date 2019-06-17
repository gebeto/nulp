const Koa = require('koa');
const KoaRouter = require('koa-router');
const requireRoute = require('./utils').requireRoute;

const usersRouter = KoaRouter({ prefix: '/users' });
usersRouter.get('/get', requireRoute('users', 'get'));
usersRouter.get('/getAll', requireRoute('users', 'getAll'));

module.exports = usersRouter;