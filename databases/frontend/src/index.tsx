console.log('ENV:', NODE_ENV);

import * as React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import cn from 'classnames';
import store from './store/';

import { HashRouter, Route, Link } from "react-router-dom";

import "@blueprintjs/core/lib/css/blueprint.css";
import './index.scss';

import { pages } from './config';

import Navbar from './components/Navbar';
import Auth from './pages/Auth';


class App extends React.Component<any, any> {
	renderAuth() {
		return (
			<div>
				<Navbar pages={pages} />
				<div className="container">
					{pages.map(page =>
						<Route key={page.path} exact {...page} />
					)}
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