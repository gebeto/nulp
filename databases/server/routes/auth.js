const jwt = require('jsonwebtoken');


exports.login = async function login(req, res) {
	const data = await req.db_query(`
		SELECT * FROM "user" u
		WHERE u.email = $1::text AND u.password = $2::text
	`, [req.body.login, req.body.password]);
	if (data.rows.length) {
		const user = data.rows[0];
		res.send({
			token: jwt.sign(user, process.env.SECRET_KEY),
			username: user.email,
			...user,
		});
	} else {
		res.send({
			error: 1,
			message: "User not found",
		});
	}
}
