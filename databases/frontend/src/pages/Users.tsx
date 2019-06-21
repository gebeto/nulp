import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { pageWithItemsFetching } from '../hoc/pageWithItemsFetching';
import { users, roles } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'email', title: 'Пошта' },
	{ key: 'role', title: 'Роль', type: 'select', endpoint: roles, changeName: 'role_id' },
];


function Users() {
	return null;
}

export default pageWithItemsFetching({
	title: "Користувачі",
	endpoint: users,
	fields: fields,
})(Users);