import { motion } from "motion/react";
interface Props {
	name: string;
	link: string;
	level: "Intermediate" | "Advanced" | "Beginner";
}
const AboutChallenge = ({ name, link, level }: Props) => {
	return (
		<motion.aside
			animate={{
				y: [0, -10, 0],
			}}
			transition={{
				duration: 1,
				repeat: Infinity,
				repeatType: "loop",
				type: "tween",
				ease: "easeInOut",
			}}
			className="absolute bottom-10 right-10 font-monteserrat flex flex-col gap-3 py-3 px-4 bg-primary-900 rounded-2xl shadow-[2px_2px_0px] sahdow-white/40"
		>
			<h2 className="text-sm  font-bold text-light-shades">{name}</h2>
			<p
				className={`${
					level === "Intermediate"
						? "text-yellow-200"
						: level === "Advanced"
						? "text-red-200"
						: "text-green-200"
				} text-xs font-semibold text-right`}
			>
				{level}
			</p>
			<a
				href={link}
				target={"_blank"}
				rel="noopener noreferrer"
				className="text-xs font-medium text-light-shades hover:text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded-md bg-dark-accent w-fit mx-auto hover:brightness-110 capitalize"
			>
				Link to the challenge
			</a>
		</motion.aside>
	);
};

export default AboutChallenge;
