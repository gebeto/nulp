import * as React from 'react';
import Table from './Table';
import { H1 } from '@blueprintjs/core';

import { usersGetAll } from './api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'email', title: 'Пошта' },
	{ key: 'role', title: 'Роль', editable: false },
];


class Users extends React.Component<any, any> {
	state = {
		data: [],
	};

	componentDidMount() {
		usersGetAll().then(res => {
			this.setState(state => ({ ...state, data: res.items }));
		});
	}

	onItemUpdate = (oldItem, newItem) => {
		this.setState(state => ({
			data: state.data.map(el => el === oldItem ? {...el, ...newItem } : el ),
		}));
	}

	render() {
		return (
			<div className="col-12">
				<H1 className="page-h1">Користувачі</H1>
				<Table data={this.state.data} fields={fields} editable={true} onItemUpdate={this.onItemUpdate} />
			</div>
		);
	}
}


export default Users;