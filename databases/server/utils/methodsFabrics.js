const express = require('express');
const requireRoute = require('./requires').requireRoute;


const arrFromObj = (arr, obj) => arr.map(el => obj[el]);


exports.createRouter = (prefix) => {
	const router = express.Router();
	router.post('/get', requireRoute(prefix, 'get'));
	router.post('/getAll', requireRoute(prefix, 'getAll'));
	router.post('/update', requireRoute(prefix, 'update'));
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