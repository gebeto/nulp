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


exports.update = fabrics.update(['id', 'email', 'role_id'], `
	UPDATE "user"
		SET
			email = $2::text,
			role_id = $3::numeric
	WHERE id = $1::numeric
`);
