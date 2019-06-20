const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "color" c
	WHERE c.id_color = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		id_color as id,
		name
	FROM "color" c
	ORDER BY c.id_color
`);


exports.update = fabrics.update(['id', 'name'], `
	UPDATE "color" SET name = $2::text WHERE id = $1::numeric;
`);
