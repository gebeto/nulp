const { Client } = require('pg')
const client = new Client({
	host: 'database',
	user: process.env.POSTGRES_USER,
	database: process.env.POSTGRES_DB,
	password: process.env.POSTGRES_PASSWORD,
	port: 5432,
});

try {
client.connect();
} catch(err) {
	console.log('ERRRRRR', err);
}

async function sendQuery(query, params) {
	return await client.query(query, params);
}

function dbMiddleware(req, res, next) {
	req.db_query = sendQuery;
	next();
}

exports.query = sendQuery;
exports.middleware = dbMiddleware;