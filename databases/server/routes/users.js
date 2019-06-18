exports.get = async function get(req, res) {
	console.log(req.query)
	const data = await req.db_query(`
		SELECT * FROM "user" u
		WHERE u.id = $1::numeric
	`, [req.query.id]);
	if (data.rows.length) {
		res.send(data.rows[0]);
	} else {
		res.send({
			error: 1,
			message: "User not found",
		});
	}
}


exports.getAll = async function getAll(req, res) {
	const data = await req.db_query(`
		SELECT
			u.id,
			u.email,
			u.role_id,
			r.name as role
		FROM "user" u
		INNER JOIN "role" r ON u.role_id = r.id
		ORDER BY u.id
	`)

	await res.send({
		items: data.rows
	});
}

exports.update = async function update(req, res) {
	try {
		const data = await req.db_query(`
			UPDATE "user" SET email = $1::text WHERE id = $2::numeric;
		`, [req.body.email, req.body.id])
		await res.send({
			success: data.rowCount,
		});
	} catch(err) {
		await res.send({
			error: 1,
			message: err.detail,
		});		
	}
}