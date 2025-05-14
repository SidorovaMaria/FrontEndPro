import { Outlet } from "react-router";
// import Cursor from "../components/Cursor";
import NavBar from "../components/NavBar";
import { ToastContainer, Slide } from "react-toastify";
const Layout = () => {
	return (
		<>
			{/* <Cursor /> */}

			<NavBar />
			<Outlet />
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop={true}
				closeOnClick={true}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Slide}
			/>
		</>
	);
};

export default Layout;
