function requireUncached(module){
	delete require.cache[require.resolve(module)];
	return require(module);
}


function requireWithErrorHandling(requireFunc, prefix, method) {
	return function(req, res) {
		try {
			requireFunc(`../routes/${prefix}`)[method](req, res).catch(err => {
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



exports.requireUncached = requireUncached;
exports.requireRoute = process.env.SERVER_ROUTE_HOT_RELOAD === "true" ? requireUncachedRoute : requireCachedRoute;