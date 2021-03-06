const path = require('path');
const express = require('express');
const jwt = require('express-jwt');
const bodyParser = require('body-parser');
const db = require('./utils/db');

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
			if (req.body.token) return req.body.token;
			if (req.query.token) return req.query.token;
			return null;
		}
	})
	.unless({path: ['/favicon.ico', '/api/auth/login', '/static/bundle.js', '/']})
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