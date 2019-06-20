const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.dictGet('color', 'id_color', 'name');
exports.getAll = fabrics.dictGetAll('color', 'id_color', 'name');
exports.update = fabrics.dictUpdate('color', 'id_color', 'name');
exports.add = fabrics.dictAdd('color', 'id_color', 'name');
