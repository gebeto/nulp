import * as React from 'react';
import { connect } from 'react-redux';
import { setAuthData } from '../store/Globals';

import { Button, Card, Elevation } from "@blueprintjs/core";
import { FormGroup, H3, InputGroup, Icon, Intent, Switch } from "@blueprintjs/core";
import { login } from '../api';


function auth(username, password) {
	return login(username, password);
}


class Auth extends React.Component<any, any> {
	state = {
		loading: false,

	}

	onFieldChange = (e) => {
		const { name, value } = e.target;
		this.setState(state => ({
			...state,
			[name]: value,
		}));
	}

	auth = () => {
		this.setState(state => ({ loading: true }));
		auth(this.state.login, this.state.password).then(res => {
			this.setState(state => ({
				loading: false,
			}));
			this.props.auth(res);
		});
	}

	render() {
		const { loading } = this.state;
		const { token, username } = this.props.globals;
		return (
			<main className="centered">
				<Card elevation={Elevation.TWO} className="auth-card">
					<H3 className="text-center">Авторизація</H3>
					<FormGroup labelFor="login-input">
						<InputGroup id="login-input" placeholder="Логін" leftIcon="user" name="login" onChange={this.onFieldChange} />
					</FormGroup>
					<FormGroup labelFor="password-input">
						<InputGroup type="password" id="password-input" placeholder="Пароль" leftIcon="key" name="password" onChange={this.onFieldChange}  />
					</FormGroup>
					<Button fill loading={loading} onClick={this.auth}>Увійти</Button>
				</Card>
			</main>
		);
	}
}


export default connect(
	state => ({ globals: state.globals }),
	dispatch => ({
		auth(data) {
			dispatch(setAuthData(data))
			console.log('AUTH', data);
		}
	}),
)(Auth);