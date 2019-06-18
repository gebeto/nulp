const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(db.middleware);
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/api', require('./routes/'));


app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'templates', 'index.html'));
});


app.listen(PORT, () => {
	console.log(`App is started on http://localhost:${PORT}`);
})