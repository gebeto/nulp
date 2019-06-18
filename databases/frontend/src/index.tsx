console.log('ENV:', NODE_ENV);

import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import cn from 'classnames';
import store from './store/';

import { HashRouter, Route, Link } from "react-router-dom";

import "@blueprintjs/core/lib/css/blueprint.css";
import './index.scss';

import Navbar from './Navbar';
import Auth from './Auth';


class App extends React.Component<any, any> {
	render() {
		return (
			<div>
				<Navbar />
				<Route path="/auth" component={Auth} />
			</div>
		);
	}
}


render(
	(
		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>
	),
	document.getElementById("app"),
);