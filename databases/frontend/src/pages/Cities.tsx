import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { pageWithItemsFetching } from '../hoc/pageWithItemsFetching';
import { cities } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'name', title: 'Назва' },
	{ key: 'post_code', title: 'Поштовий індекс' },
];

function Roles() {
	return null;
}

export default pageWithItemsFetching({
	title: "Міста",
	endpoint: cities,
	fields: fields,
})(Roles);