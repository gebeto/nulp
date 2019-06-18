import * as React from 'react';
import Table from './Table';
import { H1 } from '@blueprintjs/core';


const data = [
	{ id: 1, name: 'Slavik 1' },
	{ id: 2, name: 'Slavik 2' },
	{ id: 3, name: 'Slavik 3' },
];

const fields = [
	{ key: 'id', title: 'Id' },
	{ key: 'name', title: 'Ім\'я' },
];

export default function Users({}) {
	return (
		<div className="col-12">
			<H1 className="page-h1">Користувачі</H1>
			<Table data={data} fields={fields} editable={true} />
		</div>
	);
}