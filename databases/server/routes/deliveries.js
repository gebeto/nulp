const fabrics = require('../utils/methodsFabrics');


exports.get = fabrics.get(['id'], `
	SELECT * FROM "vCustomersDelivery"
`)


exports.getAll = fabrics.getAll([], `
	SELECT * FROM "vCustomersDelivery"
`);
