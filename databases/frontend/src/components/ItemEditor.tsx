import * as React from 'react';
import {
	HTMLTable,
	HTMLSelect,
	Button,
	Drawer,
	Classes,
	FormGroup,
	InputGroup,
	H3,
	ControlGroup,
	Dialog,
	Intent
} from '@blueprintjs/core';

import AddItemDialog from './AddItemDialog';
import EditItemsDialog from './EditItemsDialog';


const EditableHoc = () => (Component) => class extends React.Component<any, any> {
	state = {
		data: [],
		isFetching: false,
	
		isAddDialogOpen: false,
		isEditDialogOpen: false,
	}

	componentDidMount() {
		this.setState(state => ({ ...state, fetching: true, }));
		this.props.endpoint.getAll().then(res => {
			this.setState(state => ({
				...state,
				fetching: true,
				data: res.items
			}));
		});
	}

	onChange = (e) => {
		const { name, value } = e.target;
		const selectedValue = this.state.data.find(el => el[this.props.endpoint.key] == value);
		const Pvalue = selectedValue[this.props.endpoint.value];
		const Pkey = selectedValue[this.props.endpoint.key];
		this.props.onChange({ target: { name: name, value: Pvalue } });
		this.props.onChange({ target: { name: this.props.changeName, value: Pkey } });
	}

	onEditClick = () => {
		this.setState(state => ({ ...state, isEditDialogOpen: true }));
	}


	onEditClose = () => {
		this.setState(state => ({ ...state, isEditDialogOpen: false }));
	}

	onAddClick = () => {
		this.setState(state => ({ ...state, isAddDialogOpen: true }));
	}

	onAddSuccess = (data) => {
		this.setState(state => ({
			...state,
			data: Array.prototype.concat([], state.data, data),
		}));
		this.onAddClose();
	}

	onAddClose = () => {
		this.setState(state => ({ ...state, isAddDialogOpen: false }));
	}

	render() {
		return (
			<Component
				{...this.props}
				{...this.state}
				onChange={this.onChange}
				onAddClick={this.onAddClick}
				onAddClose={this.onAddClose}
				onAddSuccess={this.onAddSuccess}
				onEditClick={this.onEditClick}
				onEditClose={this.onEditClose}
			/>
		);
	}
}


const EndpointSelect = EditableHoc()((props) => {
	const {
		name,
		value,
		disabled,
		onChange,
		onAddClick,
		onAddSuccess,
		onAddClose,
		onEditClick,
		onEditClose,
		endpoint,
		field,
		data,
		isAddDialogOpen,
		isEditDialogOpen,
	} = props;

	return (
		<ControlGroup fill={true} vertical={false}>
			<HTMLSelect fill disabled={disabled} name={name} value={value} onChange={onChange}>
				{data.reduce((res, val) => {
					res[value == val[endpoint.value] ? 'unshift' : 'push'](val);
					return res;
				}, []).map(el =>
					<option key={el[endpoint.key]} value={el[endpoint.key]}>{el[endpoint.value]}</option>
				)}
			</HTMLSelect>
			<Button icon="cog" onClick={onEditClick} />
			{field.add === false ? null : <Button icon="add" onClick={onAddClick} />}
			<AddItemDialog
				isOpen={isAddDialogOpen}
				onAddClose={onAddClose}
				onAddSuccess={onAddSuccess}
				endpoint={endpoint}
				field={field}
			/>
			<EditItemsDialog
				isOpen={isEditDialogOpen}
				onEditClose={onEditClose}
				endpoint={endpoint}
				field={field}
			/>
		</ControlGroup>
	);
});


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
		console.log(name, value);
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
		const { data, fields, onCancel, saving } = this.props;
		const newData = {
			...data,
			...this.state.fields,
		}
		return (
			<Drawer isOpen={!!data} onClose={this.props.onCancel}>
				<div className={Classes.DRAWER_HEADER}>
					<H3>Редагування</H3>
				</div>
				<div className={Classes.DRAWER_BODY}>
					<div className={Classes.DIALOG_BODY}>
						{this.props.data ?
							fields.map(field =>
								<FormGroup label={field.title} key={field.key}>
									{field.type === 'select' ?
									<EndpointSelect disabled={field.editable === false} name={field.key} value={newData[field.key]} onChange={this.onFieldChange} endpoint={field.endpoint} changeName={field.changeName} field={field} />
									:
									<InputGroup autoComplete="off" type={field.type} disabled={field.editable === false} placeholder={field.title} name={field.key} value={newData[field.key]} onChange={this.onFieldChange} />
									}
								</FormGroup>
							)
							: null
						}
					</div>
				</div>
				<div className={Classes.DRAWER_FOOTER}>
					<Button loading={saving} className="bp3-intent-success" large fill onClick={this.save}>Зберегти</Button>
				</div>
			</Drawer>
		);
	}
}


export default ItemEditor;