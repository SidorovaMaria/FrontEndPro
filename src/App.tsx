import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StarRating from "./pages/StarRating";
import Layout from "./pages/Layout";
import Accordion from "./pages/Accordion";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="star-rating" element={<StarRating />} />
					<Route path="accordion" element={<Accordion />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
