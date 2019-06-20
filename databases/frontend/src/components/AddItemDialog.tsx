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


class AddDialog extends React.Component<any, any> {
	state = {
		value: '',
		loading: false,
	};

	onChange = (e) => {
		const { name, value } = e.target;
		this.setState(state => ({ ...state, value: value }));
	}

	onSubmit = () => {
		console.log('SUBMIT', this.state.value);
		this.setState(state => ({
			...state,
			loading: true,
		}));
		this.props.endpoint.add({ name: this.state.value }).then(res => {
			this.setState(state => ({
				...state,
				value: '',
				loading: false,
			}));
			this.props.onAddSuccess(res.data);
		}).catch(err => {
			this.setState(state => ({
				...state,
				loading: false,
			}));			
		});
	}

	render() {
		const { field, isOpen, onAddClose, onAddSuccess } = this.props;
		return (
            <Dialog
                icon="add"
                title={`Додати ${field.title}`}
                isOpen={isOpen}
                onClose={onAddClose}
            >
                <div className={Classes.DIALOG_BODY}>
					<FormGroup label="Назва">
						<InputGroup placeholder="Назва" name="name" value={this.state.value} onChange={this.onChange} />
					</FormGroup>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                	<Button loading={this.state.loading} large fill intent={Intent.SUCCESS} onClick={this.onSubmit}>Додати</Button>
                </div>
            </Dialog>
		);
	}
}


export default AddDialog;