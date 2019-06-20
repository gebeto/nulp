const fabrics = require('../utils/methodsFabrics');

exports.get = fabrics.dictGet('material', 'id_material', 'name');
exports.getAll = fabrics.dictGetAll('material', 'id_material', 'name');
exports.update = fabrics.dictUpdate('material', 'id_material', 'name');

exports.add = async function add(req, res) {
	try {
		const data = await req.db_query(`
			INSERT INTO public.material (name) VALUES ($1::text);
		`, ['name'])
		console.log('ADD', data);
		await res.send({
			success: data.rowCount,
		});
	} catch(err) {
		console.log('ADD ERROR', err);
		await res.send({
			error: 1,
			message: err.detail || err.message,
		});		
	}
}