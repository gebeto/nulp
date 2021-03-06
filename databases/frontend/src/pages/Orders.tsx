import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { pageWithItemsFetching } from '../hoc/pageWithItemsFetching';
import { orders, employees, customers, doors } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	{ key: 'customer', title: 'Покупець', type: 'select', endpoint: customers, changeName: 'customer_id', add: false },
	{ key: 'employee', title: 'Продавець', type: 'select', endpoint: employees, changeName: 'employee_id', add: false },
	{ key: 'door', title: 'Двері', type: 'select', endpoint: doors, changeName: 'door_id', add: false },
	{ key: 'width', title: 'Ширина', type: 'number' },
	{ key: 'height', title: 'Висота', type: 'number' },
	{ key: 'length', title: 'Довщина', type: 'number' },
	{ key: 'details', title: 'Деталі' },
	{ key: 'date_on', title: 'Дата відправки', editable: false },
	{ key: 'date_off', title: 'Дата отримання', editable: false },
];

function Orders() {
	return null;
}

export default pageWithItemsFetching({
	title: "Замовлення",
	endpoint: orders,
	fields: fields,
})(Orders);