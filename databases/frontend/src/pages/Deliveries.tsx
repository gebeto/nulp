import * as React from 'react';
import Table from '../components/Table';
import { H1 } from '@blueprintjs/core';

import { pageWithItemsFetching } from '../hoc/pageWithItemsFetching';
import { deliveries, employees, customers, doors } from '../api';


const fields = [
	{ key: 'id', title: 'Id', editable: false },
	// customer_id: 1
	{ key: 'done', title: 'Доставлено', editable: false },
	{ key: 'name', title: 'Отримувач', editable: false },
	{ key: 'phone_number', title: 'Номер отримувача', editable: false },
	// id_customer: 1
	// order_id: 1
	// { key: 'customer', title: 'Покупець', editabled: false },
	// { key: 'employee', title: 'Продавець', type: 'select', endpoint: employees, changeName: 'employee_id', add: false },
	// { key: 'door', title: 'Двері', type: 'select', endpoint: doors, changeName: 'door_id', add: false },
	// { key: 'width', title: 'Ширина', type: 'number' },
	// { key: 'height', title: 'Висота', type: 'number' },
	// { key: 'length', title: 'Довщина', type: 'number' },
	// { key: 'details', title: 'Деталі' },
	// { key: 'date_on', title: 'Дата відправки', editable: false },
	// { key: 'date_off', title: 'Дата отримання', editable: false },
];

function Deliveries() {
	return null;
}

export default pageWithItemsFetching({
	title: "Доставки",
	endpoint: deliveries,
	fields: fields,
})(Deliveries);