const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "logs" item
	WHERE item.id = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT * FROM "logs"
	ORDER BY id DESC
	LIMIT 20
`);