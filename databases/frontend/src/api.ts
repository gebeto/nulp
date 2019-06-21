import store from './store/';
import { resetAuthData } from './store/Globals';

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
	}).then(res => {
		if (res.status === 401) {
			store.dispatch(resetAuthData());
			throw "Unauthorized!";
		}

		return res.json();
	})
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

const createReadOnlyEndpoint = (prefix) => createEndpoint(prefix, ['get', 'getAll']);
const createClassicEndpoint = (prefix, opts) => {
	const methods = createEndpoint(prefix, ['get', 'getAll', 'update', 'add'], opts);
	return methods;
};


export const employees = createReadOnlyEndpoint('employees');
export const customers = createReadOnlyEndpoint('customers');
export const deliveries = createReadOnlyEndpoint('deliveries');

export const orders = createEndpoint('orders', ['get', 'getAll', 'update']);
export const users = createEndpoint('users', ['get', 'getAll', 'update']);
export const doors = createEndpoint('doors', ['get', 'getAll', 'update']);
export const logs = createEndpoint('logs', ['get', 'getAll', 'update']);

export const cities = createClassicEndpoint('cities');
export const materials = createClassicEndpoint('materials', { isDict: true });
export const colors = createClassicEndpoint('colors', { isDict: true });
export const roles = createClassicEndpoint('roles', { isDict: true });
