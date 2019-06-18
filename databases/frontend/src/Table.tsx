import * as React from 'react';
import { HTMLTable, Button, Drawer, Classes, FormGroup, InputGroup } from '@blueprintjs/core'


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




class ItemEditor extends React.Component<any, any> {
	state = {
		fields: {},
	}

	static getDerivedStateFromProps(nextProps, oldState) {
		if (nextProps.data === null) {
			return { fields: {} };
		}

		return null;
	}

	onFieldChange = (e) => {
		const { name, value } = e.target;
		this.setState(state => ({
			...state,
			fields: {
				...state.fields,
				[name]: value,
			}
		}));
	}

	save = () => {
		this.props.onSave && this.props.onSave(this.props.data, this.state.fields)
	}

	render() {
		const { data, fields, onCancel } = this.props;
		const newData = {
			...data,
			...this.state.fields,
		}
		return (
			<Drawer isOpen={!!data} onClose={this.props.onCancel}>
			    <div className={Classes.DRAWER_BODY}>
			        <div className={Classes.DIALOG_BODY}>
						{this.props.data ?
							fields.map(field =>
								<FormGroup label={field.title} key={field.key}>
									<InputGroup disabled={field.editable === false} placeholder={field.title} name={field.key} value={newData[field.key]} onChange={this.onFieldChange} />
								</FormGroup>
							)
							: null
						}
			        </div>
			    </div>
			    <div className={Classes.DRAWER_FOOTER}>
			    	<Button className="bp3-intent-success" large fill onClick={this.save}>Зберегти</Button>
			    </div>
			</Drawer>
		);
	}
}



class Table extends React.Component<any, any> {
	state = {
		editItem: null,
	}

	onEditClick = (item) => {
		if (!this.props.editable) return;
		console.log('EDIT', item)
		this.setState(state => ({
			...state,
			editItem: item,
		}));
	}

	onEditCancel = () => {
		this.setState(state => ({
			...state,
			editItem: null,
		}));
	}

	onEditSave = (oldData, newData) => {
		this.props.onItemUpdate && this.props.onItemUpdate(oldData, newData);
		this.onEditCancel();
	}

	render() {
		const { data, fields, editable } = this.props;
		return (
			<>
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
				<ItemEditor fields={fields} data={this.state.editItem} onCancel={this.onEditCancel} onSave={this.onEditSave} />
			</>
		);
	}
}



export default Table;