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


const createClassicEndpoint = (prefix, { key = 'id', value = 'name', isDict = false } = {}) => ({
	key: key,
	value: value,

	get() {
		return API(`${prefix}/get`);
	},

	getAll() {
		return API(`${prefix}/getAll`);
	},

	update(data) {
		return API(`${prefix}/update`, data);
	},

	add(data) {
		return API(`${prefix}/add`, data);
	},
});


export const users = createClassicEndpoint('users');
export const doors = createClassicEndpoint('doors');

export const materials = createClassicEndpoint('materials', { isDict: true });
export const colors = createClassicEndpoint('colors', { isDict: true });
export const roles = createClassicEndpoint('roles', { isDict: true });
