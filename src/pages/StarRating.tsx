import { Star } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import AboutChallenge from "../components/AboutChallenge";

const StarRating = () => {
	const [rating, setRating] = useState(0);
	const [hover, setHover] = useState(0);
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	return (
		<div className="w-screen flex-center h-[calc(100vh-80px)] font-merriweather px-6 md:px-0 relative">
			{/* Star Component */}
			<article className="flex-center flex-col gap-4 md:gap-8 p-8 md:p-16 max-w-fit mx-auto bg-white rounded-[16px] text-center shadow-[10px_10px_30px_0px] shadow-light-shades/40 ">
				<h1 className=" text-lg md:text-2xl font-bold text-[#0f172a] max-w-[458px]">
					How many stars would you give to our Online Code Editor?
				</h1>
				<aside className="flex gap-4 md:gap-8 items-center">
					{Array.from({ length: 5 }, (_, index) => (
						<Star
							key={index}
							className={`cursor-pointer ${
								index < (hover || rating) ? "fill-[#FACC15] " : "fill-[#E2E8F0]"
							} transition-colors duration-500 ease-in-out`}
							onClick={() => setRating(index + 1)}
							onMouseEnter={() => setHover(index + 1)}
							onMouseLeave={() => setHover(0)}
							size={isMobile ? 40 : 76}
							strokeWidth={0}
						/>
					))}
				</aside>
				<AnimatePresence mode="wait">
					<motion.p
						key={feedbacks[rating - 1]}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 20, opacity: 0 }}
						transition={{ type: "tween" }}
						className="text-base md:text-lg font-normal text-[#374151] max-w-[647px] min-h-[80px] place-content-center"
					>
						{feedbacks[rating - 1] || "Please select a rating"}
					</motion.p>
				</AnimatePresence>
			</article>
			<AboutChallenge
				name="Star Rating Component"
				link="https://www.frontendpro.dev/frontend-coding-challenges/star-rating-component-geShE1ApkqUoNCqujxOd"
				level="Intermediate"
			/>
		</div>
	);
};

export default StarRating;

const feedbacks = [
	"We're sorry to hear that you had a bad experience. We would like to learn more about what happened and how we can make things right.",
	"We apologize for the inconvenience you experienced. We appreciate your feedback and would like to work with you to address any issues.",
	"Thank you for your feedback. We're sorry to hear that your experience wasn't perfect. We would love to hear more about your concerns to see how we can improve.",
	"Thank you for your positive feedback! We're glad to know that you had a great experience and we appreciate your support.",
	"Excellent! We're thrilled to hear you had such a positive experience. Thank you for choosing our platform",
];
