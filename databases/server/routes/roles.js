const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "role" r
	WHERE r.id = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT * FROM "role" r
	ORDER BY r.id
`);


exports.update = fabrics.update(['id', 'name'], `
	UPDATE "role" SET name = $2::text WHERE id = $1::numeric;
`);
