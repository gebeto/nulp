export const initialState = {
	token: localStorage.getItem('token'),
	username: localStorage.getItem('username'),
};


export const SET_AUTH_DATA = 'SET_AUTH_DATA';


export const reducer = (state: any = initialState, { type, payload }: any) => {
	if (type === SET_AUTH_DATA) {
		localStorage.setItem('token', payload.token)
		localStorage.setItem('username', payload.username)
		return {
			...state,
			...payload,
		}
	}
	return state;
}


export const setAuthData = (authData: any) => {
	return {
		type: SET_AUTH_DATA,
		payload: authData,
	};
};