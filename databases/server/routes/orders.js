const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "order" item
	WHERE item.id_order = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		item.id_order as id,
		item.*,
		CONCAT(emp.first_name, ' ', emp.last_name) as employee,
		CONCAT(cus.first_name, ' ', cus.last_name) as customer,
		dor.model as door
	FROM "order" item
	LEFT JOIN "employee" emp ON emp.id_employee = item.employee_id
	LEFT JOIN "customer" cus ON cus.id_customer = item.customer_id
	LEFT JOIN "door" dor ON dor.id_door = item.door_id
	ORDER BY item.id_order
`);


exports.update = fabrics.update(['id_order', 'customer_id', 'door_id', 'employee_id', 'width', 'height', 'length', 'details', 'date_on', 'date_off'], `
	UPDATE "order"
		SET
			customer_id = $2::numeric,
			door_id = $3::numeric,
			employee_id = $4::numeric,
			width = $5::numeric,
			height = $6::numeric,
			length = $7::numeric,
			details = $8::text,
			date_on = $9::date,
			date_off = $10::date
	WHERE id_order = $1::numeric
`);