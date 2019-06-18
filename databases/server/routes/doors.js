exports.get = async function get(req, res) {
	console.log(req.query)
	const data = await req.db_query(`
		SELECT * FROM "door" dr
		WHERE dr.id_door = $1::numeric
	`, [req.query.id]);
	if (data.rows.length) {
		res.send(data.rows[0]);
	} else {
		res.send({
			error: 1,
			message: "Door not found",
		});
	}
}


exports.getAll = async function getAll(req, res) {
	const data = await req.db_query(`
		SELECT
			dr.id_door as id, 
			dr.model,
			dr.price,
			m.name as material, 
			c.name as color
		FROM "door" dr
		LEFT JOIN "material" m ON dr.material_id = m.id_material
		LEFT JOIN "color" c ON dr.color_id = c.id_color
		ORDER BY dr.id_door
	`)

	await res.send({
		items: data.rows
	});
}


exports.update = async function update(req, res) {
	try {
		const data = await req.db_query(`
			UPDATE "door"
			SET
				model = $1::text,
				price = $2::numeric
			WHERE id_door = $3::numeric
				;
		`, [req.body.model, req.body.price, req.body.id])
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