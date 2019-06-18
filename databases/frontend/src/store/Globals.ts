export const initialState = {
	token: localStorage.getItem('token'),
	username: localStorage.getItem('username'),
};


export const SET_AUTH_DATA = 'SET_AUTH_DATA';
export const RESET_AUTH_DATA = 'RESET_AUTH_DATA';


export const reducer = (state: any = initialState, { type, payload }: any) => {
	if (type === SET_AUTH_DATA) {
		localStorage.setItem('token', payload.token)
		localStorage.setItem('username', payload.username)
		return {
			...state,
			...payload,
		}
	} else if (type === RESET_AUTH_DATA) {
		localStorage.removeItem('token')
		localStorage.removeItem('username')
		return {
			...state,
			token: undefined,
			username: undefined,
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

export const resetAuthData = (authData: any) => {
	return {
		type: RESET_AUTH_DATA,
	};
};