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
	`)

	await res.send({
		items: data.rows
	});
}