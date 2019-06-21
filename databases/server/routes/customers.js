const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "customer" item
	WHERE item.id = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		item.id_customer as id,
		item.*,
		CONCAT(item.first_name, ' ', item.last_name) as name
	FROM "customer" item
	ORDER BY id DESC
	LIMIT 20
`);

// first_name, last_name, address, phone_number, city_id