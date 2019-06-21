import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { pageWithItemsFetching } from '../hoc/pageWithItemsFetching';
import { doors, materials, colors } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'model', title: 'Модель' },
	{ key: 'price', title: 'Ціна', type: 'number' },
	{ key: 'material', title: 'Матеріал', type: 'select', endpoint: materials, changeName: 'material_id' },
	{ key: 'color', title: 'Колір', type: 'select', endpoint: colors, changeName: 'color_id' },
];

function Doors() {
	return null;
}

export default pageWithItemsFetching({
	title: "Двері",
	endpoint: doors,
	fields: fields,
})(Doors);