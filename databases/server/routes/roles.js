const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.dictGet('role', 'id', 'name');
exports.getAll = fabrics.dictGetAll('role', 'id', 'name');
exports.update = fabrics.dictUpdate('role', 'id', 'name');
exports.add = fabrics.dictAdd('role', 'id', 'name');
