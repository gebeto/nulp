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
	`)

	await res.send({
		items: data.rows
	});
}