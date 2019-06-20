const express = require('express');
const requireRoute = require('./requires').requireRoute;


const arrFromObj = (arr, obj) => arr.map(el => obj[el]);


exports.createRouter = (prefix) => {
	const router = express.Router();
	router.post('/get', requireRoute(prefix, 'get'));
	router.post('/getAll', requireRoute(prefix, 'getAll'));
	router.post('/update', requireRoute(prefix, 'update'));
	router.post('/add', requireRoute(prefix, 'add'));
	return router;
}


exports.get = (args, select_query) => async function get(req, res) {
	const data = await req.db_query(select_query, arrFromObj(args, req.body));
	if (data.rows.length) {
		res.send(data.rows[0]);
	} else {
		res.send({
			error: 1,
			message: "Item not found",
		});
	}
}


exports.getAll = (args, select_query) => async function getAll(req, res) {
	const data = await req.db_query(select_query, arrFromObj(args, req.body))

	await res.send({
		items: data.rows
	});
}


exports.update = (args, update_query) => async function update(req, res) {
	try {
		const data = await req.db_query(update_query, arrFromObj(args, req.body))
		await res.send({
			success: data.rowCount,
		});
	} catch(err) {
		console.log(err);
		await res.send({
			error: 1,
			message: err.detail || err.message,
		});		
	}
}


exports.add = (args, add_query) => async function add(req, res) {
	try {
		const data = await req.db_query(add_query, arrFromObj(args, req.body))
		await res.send({
			success: data.rowCount,
		});
	} catch(err) {
		console.log(err);
		await res.send({
			error: 1,
			message: err.detail || err.message,
		});		
	}
}


exports.dictGet = (table, id, name) => {
	const sql = `
		SELECT
			${id} as id,
			${name} as name
		FROM "${table}" t
		WHERE t.${id} = $1::numeric
	`;

	return exports.get(['id'], sql);
}

exports.dictGetAll = (table, id, name) => {
	const sql = `
		SELECT
			${id} as id,
			${name} as name
		FROM "${table}" t
		ORDER BY t.${id}
	`;

	return exports.getAll([], sql);
}

exports.dictUpdate = (table, id, name) => {
	const sql = `
		UPDATE "${table}" SET ${name} = $2::text WHERE ${id} = $1::numeric;
	`;

	return exports.update(['id', 'name'], sql);
}
