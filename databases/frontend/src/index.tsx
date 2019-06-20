console.log('ENV:', NODE_ENV);

import * as React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import cn from 'classnames';
import store from './store/';

import { HashRouter, Route, Link } from "react-router-dom";

import "@blueprintjs/core/lib/css/blueprint.css";
import './index.scss';

import Navbar from './Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Users from './pages/Users';
import Doors from './pages/Doors';
import Roles from './pages/Roles';


class App extends React.Component<any, any> {
	renderAuth() {
		return (
			<div>
				<Navbar />
				<div className="container">
					<Route path="/" exact component={Home} />
					<Route path="/users" exact component={Users} />
					<Route path="/doors" exact component={Doors} />
					<Route path="/roles" exact component={Roles} />
				</div>
			</div>
		);
	}

	renderUnAuth() {
		return (
			<Auth />
		);
	}

	render() {
		const { token, username } = this.props.globals;
		return (token && username) ? this.renderAuth() : this.renderUnAuth();
	}
}


const ConnectedApp = connect(
	state => ({
		globals: state.globals,
	}),
)(App);


render(
	(
		<Provider store={store}>
			<HashRouter>
				<ConnectedApp />
			</HashRouter>
		</Provider>
	),
	document.getElementById("app"),
);