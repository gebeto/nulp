const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "door" dr
	WHERE dr.id_door = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		dr.id_door as id,
		dr.model,
		dr.model as name,
		dr.price,
		m.name as material,
		c.name as color,
		dr.material_id,
		dr.color_id
	FROM "door" dr
	LEFT JOIN "material" m ON dr.material_id = m.id_material
	LEFT JOIN "color" c ON dr.color_id = c.id_color
	ORDER BY dr.id_door
`);


exports.update = fabrics.update(['id', 'model', 'price', 'material_id', 'color_id'], `
	UPDATE "door"
	SET
		model = $2::text,
		price = $3::numeric,
		material_id = $4::numeric,
		color_id = $5::numeric
	WHERE id_door = $1::numeric
`);
