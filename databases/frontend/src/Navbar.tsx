import React from 'react';
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { Link } from "react-router-dom";


export const NavUnauthorized = ({ }) => {
	return (
		<Navbar fixedToTop>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>
					Admin tool
				</Navbar.Heading>
			</Navbar.Group>
			<Navbar.Group align={Alignment.RIGHT}>
				<Navbar.Divider />
				<Link to="/auth">Login</Link>
				<Button className="bp3-minimal" icon="user" disabled />
				<Button className="bp3-minimal" icon="notifications" disabled />
				<Button className="bp3-minimal" icon="cog" disabled />
			</Navbar.Group>
		</Navbar>
	);
}

export const NavAuthorized = () => {
	return (
		<Navbar fixedToTop>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>Admin tool</Navbar.Heading>
				<Navbar.Divider />
				<Button className="bp3-minimal" icon="home" text="Home" />
				<Button className="bp3-minimal" icon="users" text="Users" />
				<Button className="bp3-minimal" icon="document" text="Doors" />
			</Navbar.Group>
			<Navbar.Group align={Alignment.RIGHT}>
				<Navbar.Divider />
				<Button className="bp3-minimal" icon="user" />
				<Button className="bp3-minimal" icon="notifications" />
				<Button className="bp3-minimal" icon="cog" />
			</Navbar.Group>
		</Navbar>
	);
}


export const NavBar = () => {
	return (
		<NavUnauthorized />
	);
}

export default NavBar;