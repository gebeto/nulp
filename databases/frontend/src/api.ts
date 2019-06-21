const base_url = "/api"

export const API = (method, data?) => {
	console.log('data', data);
	return fetch(`${base_url}/${method}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			...data,
			token: localStorage.getItem('token'),
		}),
	}).then(res => res.json())
};

export const login = (login, password) => {
	return API('auth/login', { login, password });
}

const endpointMethods = {
		get: (prefix) => () => API(`${prefix}/get`),
		getAll: (prefix) => () => API(`${prefix}/getAll`),
		update: (prefix) => (data) => API(`${prefix}/update`, data),
		add: (prefix) => (data) => API(`${prefix}/add`, data),
};

const createEndpoint = (prefix, methods, { key = 'id', value = 'name', isDict = false } = {} = {}) => {
	const result = methods.reduce((object, curr) => {
		object[curr] = endpointMethods[curr](prefix);
		return object;
	}, {});
	result.key = key;
	result.value = value;
	return result;
}


const createClassicEndpoint = (prefix, opts) => {
	const methods = createEndpoint(prefix, ['get', 'getAll', 'update', 'add'], opts);
	return methods;
};


export const orders = createEndpoint('orders', ['get', 'getAll', 'update']);
export const employees = createEndpoint('employees', ['get', 'getAll']);
export const customers = createEndpoint('customers', ['get', 'getAll']);
export const users = createEndpoint('users', ['get', 'getAll', 'update']);
export const doors = createEndpoint('doors', ['get', 'getAll', 'update']);
export const logs = createEndpoint('logs', ['get', 'getAll', 'update']);

export const materials = createClassicEndpoint('materials', { isDict: true });
export const colors = createClassicEndpoint('colors', { isDict: true });
export const roles = createClassicEndpoint('roles', { isDict: true });
