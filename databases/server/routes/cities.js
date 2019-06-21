const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT
		*
	FROM "city" item
	WHERE item.id_city = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		item.id_city as id,
		item.*
	FROM "city" item
	ORDER BY item.id_city
`);


exports.update = fabrics.update(['id_city', 'name', 'post_code'], `
	UPDATE "city"
	SET
		name = $2::text,
		post_code = $3::numeric
	WHERE id_city = $1::numeric
`);
