import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import StarRating from "./pages/StarRating";
import Layout from "./pages/Layout";
import Accordion from "./pages/Accordion";
import OTPVerification from "./pages/OTPVerification";
import RandomQuote from "./pages/RandomQuote";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="star-rating" element={<StarRating />} />
					<Route path="accordion" element={<Accordion />} />
					<Route path="otp" element={<OTPVerification />} />
					<Route path="random-quote" element={<RandomQuote />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
