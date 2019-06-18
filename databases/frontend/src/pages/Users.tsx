import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { withItemsFetching } from '../hoc/withItemsFetching';
import { users } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'email', title: 'Пошта' },
	{ key: 'role', title: 'Роль', editable: false },
];


function Users() {
	return null;
}

export default withItemsFetching({
	title: "Користувачі",
	endpoint: users,
	fields: fields,
})(<Users />);