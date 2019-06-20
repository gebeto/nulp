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


class EditDialog extends React.Component<any, any> {

	render() {
		const { field, isOpen, onEditClose } = this.props;
		return (
            <Dialog
                icon="remove"
                title={`Редагувати ${field.title}`}
                isOpen={isOpen}
                onClose={onEditClose}
            >
                <div className={Classes.DIALOG_BODY}>
					<HTMLTable interactive small condensed>
						<tbody>
							<tr>
								<td>1</td>
								<td>Item 1</td>
								<td className="w-0">
									<Button intent={Intent.DANGER} icon="delete" />
								</td>
							</tr>
						</tbody>
					</HTMLTable>					
                </div>
            </Dialog>
		);
	}
}


export default EditDialog;