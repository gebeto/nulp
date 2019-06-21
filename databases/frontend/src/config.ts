import Home from './pages/Home';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Doors from './pages/Doors';
import Roles from './pages/Roles';
import Cities from './pages/Cities';
import Deliveries from './pages/Deliveries';


export const pages = [
	{ path: "/", text: "Головна", component: Home },
	{ path: "/orders", text: "Замовлення", component: Orders },
	{ path: "/deliveries", text: "Доставки", component: Deliveries },
	{ path: "/users", text: "Користувачі", component: Users },
	{ path: "/doors", text: "Двері", component: Doors },
	{ path: "/roles", text: "Ролі", component: Roles },
	{ path: "/cities", text: "Міста", component: Cities },
];
