const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "user" u
	WHERE u.id = $1::numeric
`)


exports.getAll = fabrics.getAll([], `
	SELECT
		u.id,
		u.email,
		u.role_id,
		r.name as role
	FROM "user" u
	INNER JOIN "role" r ON u.role_id = r.id
	ORDER BY u.id
`);


exports.update = fabrics.update(['email', 'id'], `
	UPDATE "user" SET email = $1::text WHERE id = $2::numeric;
`);
