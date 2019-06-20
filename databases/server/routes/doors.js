const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "door" dr
	WHERE dr.id_door = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
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
`);


exports.update = fabrics.update(['model', 'price', 'id'], `
	UPDATE "door"
	SET
		model = $1::text,
		price = $2::numeric
	WHERE id_door = $3::numeric
`);
