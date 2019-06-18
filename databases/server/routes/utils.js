function requireUncached(module){
	delete require.cache[require.resolve(module)];
	return require(module);
}

function requireUncachedRoute(prefix, method) {
	return function(req, res) {
		requireUncached(`./${prefix}/controller`)[method](req, res);
	}
}

function requireCachedRoute(prefix, method) {
	return function(req, res) {
		require(`./${prefix}/controller`)[method](req, res);
	}
}


exports.requireUncached = requireUncached;
exports.requireRoute = process.env.SERVER_ROUTE_HOT_RELOAD === "true" ? requireUncachedRoute : requireCachedRoute;