import * as React from 'react';
import { H1 } from '@blueprintjs/core';
import Table from '../components/Table';
import ItemEditor from '../components/ItemEditor';



export const withItemsFetching = ({ title, endpoint, fields }) => (Component) => {
	return class extends React.Component<any, any> {
		static displayName = `Fetching(${Component.name})`;
		isUnmounted = false;

		state = {
			data: [],
			editableItem: null,
			saving: false,
		};

		componentWillUnmount() {
			this.isUnmounted = true;
		}

		componentDidMount() {
			this.isUnmounted = false;
			endpoint.getAll().then(res => {
				if (this.isUnmounted) return;
				this.setState(state => ({ ...state, data: res.items }));
			});
		}

		onEditClick = (item) => {
			console.log('EDIT', item)
			this.setState(state => ({
				...state,
				editableItem: item,
			}));
		}

		onEditCancel = () => {
			console.log('CANCEL', this.state)
			if (this.state.saving) return;
			console.log('CANCEL NOOO', this.state)
			this.setState(state => ({
				...state,
				editableItem: null,
			}));
		}

		onEditSave = (oldItem, newItem) => {
			this.setState(state => ({
				saving: true,
			}));
			const updatedItem = {...oldItem, ...newItem };
			endpoint.update(updatedItem)
				.then(response => {
					console.log('UPDATE', response);
					if (!response.success) throw new Error(response);
					this.setState(state => ({
						data: state.data.map(el => el === oldItem ? {...el, ...newItem } : el ),
						editableItem: null,
						saving: false,
					}));
				})
				.catch(err => {
					this.setState(state => ({
						saving: false,
					}));
				});
		}

		render() {
			return (
				<div className="col-12">
					<H1 className="page-h1">{title}</H1>
					<Table editable={true} data={this.state.data} saving={this.state.saving} fields={fields} onEditClick={this.onEditClick} />
					<ItemEditor saving={this.state.saving} fields={fields} data={this.state.editableItem} onCancel={this.onEditCancel} onSave={this.onEditSave} />
				</div>
			);
		}
	}
}