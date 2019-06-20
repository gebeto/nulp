const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.dictGet('material', 'id_material', 'name');
exports.getAll = fabrics.dictGetAll('material', 'id_material', 'name');
exports.update = fabrics.dictUpdate('material', 'id_material', 'name');
exports.add = fabrics.dictAdd('material', 'id_material', 'name');
