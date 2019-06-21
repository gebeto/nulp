import * as React from 'react';

import {
	Button,
	Alignment,
	Intent,
	Popover,
	PopoverInteractionKind,
	Position,
	Spinner,
} from "@blueprintjs/core";

import withItemsFetchingOnMount from '../hoc/withItemsFetchingOnMount';
import { logs } from '../api';


const NotificationsPopover = ({ fetching, fetchingError, data }) => {
	return (
		<div>
			<Button fill icon="cross" className="bp3-popover-dismiss" />
			<div className="notification-content">
				{fetching ? <Spinner /> : null}
				{data && data.map(el =>
					<span className="notification-item">{el.message}</span>
				)}
			</div>
		</div>
	);
};


export default withItemsFetchingOnMount({
	endpoint: logs,
})(NotificationsPopover);