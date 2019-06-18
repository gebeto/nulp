import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { withItemsFetching } from '../hoc/withItemsFetching';
import { doors } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'model', title: 'Модель' },
	{ key: 'price', title: 'Ціна' },
	{ key: 'material', title: 'Матеріал' },
	{ key: 'color', title: 'Колір' },
];

function Doors() {
	return null;
}

export default withItemsFetching({
	title: "Двері",
	endpoint: doors,
	fields: fields,
})(<Doors />);