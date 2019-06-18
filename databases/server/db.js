const { Client } = require('pg')
const client = new Client({
	host: 'database',
	user: 'admin',
	database: 'main',
	password: 'admin',
	port: 5432,
})

client.connect();

async function sendQuery(query, params) {
	return await client.query(query, params);
}

function dbMiddleware(req, res, next) {
	req.db_query = sendQuery;
	next();
}

exports.query = sendQuery;
exports.middleware = dbMiddleware;