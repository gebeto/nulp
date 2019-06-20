import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { withItemsFetching } from '../hoc/withItemsFetching';
import { roles } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'name', title: 'Назва' },
];

function Doors() {
	return null;
}

export default withItemsFetching({
	title: "Ролі",
	endpoint: roles,
	fields: fields,
})(<Doors />);