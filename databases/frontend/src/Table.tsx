import * as React from 'react';
import { HTMLTable, Button } from '@blueprintjs/core'


class Table extends React.Component<any, any> {
	onEditClick = () => {
		if (!this.props.editable) return;
		console.log('EDIT')
	}

	render() {
		const { data, fields, editable } = this.props;
		return (
						// {editable ? <th className="w-0">Edit</th> : null}
			<HTMLTable bordered small interactive={editable} condensed className="col-12">
				<thead>
					<tr>
						{fields.map(el => <th key={el.title}>{el.title}</th>)}
					</tr>
				</thead>
				<tbody>
					{data.map((el, index) =>
						<tr key={index} onClick={this.onEditClick}>
							{fields.map(field =>
								<td key={field.key}>{el[field.key]}</td>
							)}
						</tr>
					)}
				</tbody>
			</HTMLTable>
							// {editable ? <td className="w-0"><Button>Edit</Button></td> : null}
		);
	}
}



export default Table;