const Koa = require('koa');
const app = new Koa();
const PORT = process.env.SERVER_PORT || 3001;


app.use(require('./routes/index').routes());


app.listen(PORT, () => {
	console.log(`Server start on port ${PORT}`);
});