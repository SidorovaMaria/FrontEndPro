import { Outlet } from "react-router";
// import Cursor from "../components/Cursor";
import NavBar from "../components/NavBar";

const Layout = () => {
	return (
		<>
			{/* <Cursor /> */}

			<NavBar />
			<Outlet />
		</>
	);
};

export default Layout;
