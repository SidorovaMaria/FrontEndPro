import { Plus, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import AboutChallenge from "../components/AboutChallenge";
const Accordion = () => {
	const [openAccordion, setOpenAccordion] = useState<number | null | undefined>(undefined);

	return (
		<div className="w-screen flex-center h-[calc(100vh-80px)]  px-6 md:px-0 relative font-Poppins">
			<article className="flex-center flex-col gap-[26px] px-[78px] py-[52px] max-w-fit mx-auto bg-white rounded-[25px] text-center shadow-[10px_10px_30px_0px] shadow-light-shades/40 ">
				<section className="flex flex-col gap-[3px] text-[#0e1c4e] flex-center ">
					<h1 className="text-[26px] font-bold w-fit">Frequently Asked Questions</h1>
					<p className="text-[14px] font-normal max-w-[266px]">
						Answers to common questions about our frontend challenges website.
					</p>
				</section>
				<div className="flex flex-col  text-[#0E1C4E] gap-7">
					{questions.map((item, index) => {
						const isOpen = openAccordion === index + 1;
						return (
							<div
								key={item.color}
								style={{ backgroundColor: item.color }}
								className={`flex flex-col gap-2 items-start  px-4 py-5 relative `}
							>
								<div className="flex justify-between w-full gap-2">
									<hr
										className="w-1 h-full absolute left-0 top-0"
										style={{ backgroundColor: item.accentColor }}
									/>
									<p
										className={`text-[14px] font-normal ${
											isOpen && "font-bold!"
										}`}
									>
										{item.question}
									</p>
									{isOpen ? (
										<X
											size={16}
											className="cursor-pointer"
											onClick={() => setOpenAccordion(null)}
										/>
									) : (
										<Plus
											size={16}
											className="cursor-pointer"
											onClick={() => setOpenAccordion(index + 1)}
										/>
									)}
								</div>
								<AnimatePresence mode="popLayout">
									{isOpen && (
										<motion.p
											key={item.answer[0]}
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "100%", opacity: 1 }}
											className=" text-left w-fit max-w-[464px] text-[14px] "
										>
											{item.answer}
										</motion.p>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</article>
			<AboutChallenge
				name="Accordion Component"
				link="https://www.frontendpro.dev/frontend-coding-challenges/accordion-component-WgPLB3f5dCRSIda2s77V"
				level="Intermediate"
			/>
		</div>
	);
};

export default Accordion;
interface Question {
	accentColor: string;
	color: string;
	question: string;
	answer: string;
}
// Define the questions array with the correct type

const questions: Question[] = [
	{
		accentColor: "#FB923C",
		color: "#FFEDD5",
		question: "Can I use FrontendPro to prepare for a frontend job interview?",
		answer: "Yes, FrontendPro is a great resource for preparing for frontend job interviews. The challenges are designed to simulate real-world scenarios and help you practice your skills.",
	},
	{
		accentColor: "#818CF8",
		color: "#E0E7FF",
		question: "Do I need to have experience in frontend dev to use FrontendPro?",
		answer: "FrontendPro is designed to accommodate developers of all skill levels. Our challenges range from beginner to advanced, so there's something for everyone. ",
	},
	{
		accentColor: "#A78BFA",
		color: "#EDE9FE",
		question: "How often are new challenges added to FrontendPro?",
		answer: "We regularly update our platform with new challenges to keep things fresh and engaging. Be sure to check back often for new content!",
	},
	{
		accentColor: "#F472B6",
		color: "#FCE7F3",
		question: "What kind of frontend challenges can I expect to find on FrontendPro?",
		answer: "FrontendPro offers a variety of challenges, including HTML, CSS, JavaScript, React, and more. Each challenge is designed to test your skills and help you learn new techniques.",
	},
	{
		accentColor: "#4ADE80",
		color: "#d6fae1",
		question: "Can I use libraries/frameworks on these projects?",
		answer: "Yes, you can use libraries and frameworks like React, Vue, or Angular to complete the challenges. However, we encourage you to try building the projects from scratch to improve your skills.",
	},
];
