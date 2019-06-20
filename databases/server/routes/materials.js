const fabrics = require('../utils/methodsFabrics');

exports.get = fabrics.dictGet('material', 'id_material', 'name');
exports.getAll = fabrics.dictGetAll('material', 'id_material', 'name');
exports.update = fabrics.dictUpdate('material', 'id_material', 'name');

exports.add = async function add(req, res) {
	try {
		const data = await req.db_query(`
			INSERT INTO public.material (name) VALUES ($1::text)
			RETURNING id_material, name
		`, [req.body.name])
		await res.send({
			success: data.rowCount,
			data: data.rows
		});
	} catch(err) {
		await res.send({
			error: 1,
			message: err.detail || err.message,
		});		
	}
}