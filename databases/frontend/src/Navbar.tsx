import React from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, Alignment, Intent, Popover, PopoverInteractionKind, Position } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

import { resetAuthData } from './store/Globals';


const NavButtonLink = ({ to, text }) => (
	<NavLink to={to} exact>
		<Button className="bp3-minimal" text={text} />
	</NavLink>
);


class NavBar extends React.Component<any, any> {
	state = {
		notification: false,
	}

	showNotifiations = () => {
		this.setState(state => ({
			...state,
			notification: true,
		}))
	}

	render() {
		return (
			<Navbar>
				<Navbar.Group align={Alignment.LEFT}>
					<Navbar.Heading>Admin tool</Navbar.Heading>
					<Navbar.Divider />
					<NavButtonLink to="/" text="Головна" />
					<NavButtonLink to="/users" text="Користувачі" />
					<NavButtonLink to="/doors" text="Двері" />
				</Navbar.Group>
				<Navbar.Group align={Alignment.RIGHT}>
					<Navbar.Divider />
					<Button className="bp3-minimal" icon="cog" />
		            <Popover
		                interactionKind={PopoverInteractionKind.CLICK}
		                popoverClassName="bp3-popover-content-sizing"
		                position={Position.BOTTOM_RIGHT}
		            >
		                <Button className="bp3-minimal" icon="notifications"></Button>
		                <div>
		                    <h3>Логи</h3>
		                    <p>...</p>
		                    <Button className="bp3-popover-dismiss">Закрити</Button>
		                </div>
		            </Popover>
					<Button className="bp3-minimal" icon="user" text="Вийти" onClick={this.props.logout} />
				</Navbar.Group>
			</Navbar>
		);
	}
}


export default connect(
	undefined,
	dispatch => ({
		logout() {
			dispatch(resetAuthData());
		}
	}),
)(NavBar);