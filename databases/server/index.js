const path = require('path');
const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const db = require('./db');

const PORT = process.env.SERVER_PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(
	jwt({
		secret: process.env.SECRET_KEY,
		getToken: function getToken (req) {
			if (req.body.token) {
				console.log('REQ BODY TOKEN', req.body.token);
				return req.body.token;
			}
			// if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			// 	return req.headers.authorization.split(' ')[1];
			// } else if (req.query && req.query.token) {
			// 	return req.query.token;
			// } else if (req.body && req.body.token) {
			// 	return req.body.token;
			// }
			return null;
		}
	})
	.unless({path: ['/api/auth/login', '/static/bundle.js', '/']})
);
app.use(db.middleware);
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/api', require('./routes/'));


app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'templates', 'index.html'));
});


app.listen(PORT, () => {
	console.log(`App is started on http://localhost:${PORT}`);
})