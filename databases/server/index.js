const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.use('/api/users', require('./routes/users/'));


app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'templates', 'index.html'));
});


app.listen(PORT, () => {
	console.log(`App is started on http://localhost:${PORT}`);
})