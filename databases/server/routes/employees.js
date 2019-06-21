const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT
		*
	FROM "employee" item
	WHERE item.id_employee = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		item.id_employee as id,
		item.*,
		CONCAT(item.first_name, ' ', item.last_name) as name
	FROM "employee" item
	ORDER BY item.id_employee
`);