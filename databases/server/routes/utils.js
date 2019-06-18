const jwt = require('jsonwebtoken');


function requireUncached(module){
	delete require.cache[require.resolve(module)];
	return require(module);
}

function requireWithErrorHandling(requireFunc, prefix, method) {
	return function(req, res) {
		try {
			requireFunc(`./${prefix}`)[method](req, res).catch(err => {
				console.log(err);
				res.send(err);
			});
		} catch(err) {
			console.log(err);
			res.send(err);
		}
	}
}


function requireUncachedRoute(prefix, method) {
	return requireWithErrorHandling(requireUncached, prefix, method)
}


function requireCachedRoute(prefix, method) {
	return requireWithErrorHandling(require, prefix, method)
}


const SECRET = "MY_SECRET";

exports.decodeJWT = (token) => {
	return jwt.decode(token);
}

exports.encodeJWT = (data) => {
	return jwt.sign(data, SECRET);
}


exports.requireUncached = requireUncached;
exports.requireRoute = process.env.SERVER_ROUTE_HOT_RELOAD === "true" ? requireUncachedRoute : requireCachedRoute;