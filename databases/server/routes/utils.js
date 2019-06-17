function requireUncached(module){
	delete require.cache[require.resolve(module)];
	return require(module);
}

function requireUncachedRoute(prefix, method) {
	return function(ctx) {
		requireUncached(`./${prefix}`)[method](ctx);
	}
}

function requireCachedRoute(prefix, method) {
	return function(ctx) {
		require(`./${prefix}`)[method](ctx);
	}
}


exports.requireUncached = requireUncached;
exports.requireRoute = process.env.SERVER_ROUTE_HOT_RELOAD === "true" ? requireUncachedRoute : requireCachedRoute;