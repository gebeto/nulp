import * as React from 'react';
import { HTMLTable, Button, Drawer, Classes, FormGroup, InputGroup, H3 } from '@blueprintjs/core';


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
									<InputGroup disabled={field.editable === false} placeholder={field.title} name={field.key} value={newData[field.key]} onChange={this.onFieldChange} />
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