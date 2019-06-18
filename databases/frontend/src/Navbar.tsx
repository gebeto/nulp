import React from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { NavLink } from "react-router-dom";

import { resetAuthData } from './store/Globals';


const NavButtonLink = ({ to, text }) => (
	<NavLink to={to} exact>
		<Button className="bp3-minimal" text={text} />
	</NavLink>
);


class NavBar extends React.Component<any, any> {
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
					<Button className="bp3-minimal" icon="notifications" />
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