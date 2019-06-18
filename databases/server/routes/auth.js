const utils = require('./utils');

exports.login = async function login(req, res) {
	const data = await req.db_query(`
		SELECT * FROM "user" u
		WHERE u.email = $1::text AND u.password = $2::text
	`, [req.body.login, req.body.password]);
	console.log('data.rows', data.rows);
	if (data.rows.length) {
		const user = data.rows[0];
		res.send({
			token: utils.encodeJWT(user),
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
