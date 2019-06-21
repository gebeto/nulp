import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { pageWithItemsFetching } from '../hoc/pageWithItemsFetching';
import { roles } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'name', title: 'Назва' },
];

function Roles() {
	return null;
}

export default pageWithItemsFetching({
	title: "Ролі",
	endpoint: roles,
	fields: fields,
})(Roles);