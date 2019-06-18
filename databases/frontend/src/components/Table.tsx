import * as React from 'react';
import { HTMLTable, Button, Drawer, Classes, FormGroup, InputGroup, H3 } from '@blueprintjs/core';
import ItemEditor from './ItemEditor';


class TableRow extends React.Component<any, any> {
	onEditClick = () => {
		this.props.onEditClick && this.props.onEditClick(this.props.data);
	}

	render() {
		const { fields, data, index } = this.props;
		return (
			<tr key={index} onClick={this.onEditClick}>
				{fields.map(field =>
					<td key={field.key}>{data[field.key]}</td>
				)}
			</tr>
		);
	}
}



class Table extends React.Component<any, any> {
	state = {
		editItem: null,
	}

	onEditClick = (item) => {
		if (!this.props.editable) return;
		this.props.onEditClick(item);
	}

	render() {
		const { data, fields, editable } = this.props;
		return (
			<HTMLTable bordered small interactive={editable} condensed className="col-12">
				<thead>
					<tr>
						{fields.map(el => <th key={el.title}>{el.title}</th>)}
					</tr>
				</thead>
				<tbody>
					{data.map((el, index) =>
						<TableRow key={index} fields={fields} data={el} index={index} onEditClick={this.onEditClick} />
					)}
				</tbody>
			</HTMLTable>
		);
	}
}



export default Table;