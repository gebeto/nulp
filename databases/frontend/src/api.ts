const base_url = "/api"

export const API = (method, data) => {
	console.log('data', data);
	return fetch(`${base_url}/${method}`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	}).then(res => res.json())
};

export const login = (login, password) => {
	return API('auth/login', { login, password });
}