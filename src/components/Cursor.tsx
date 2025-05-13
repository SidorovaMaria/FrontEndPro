import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import useMousePosition from "../hook/useMousePosition";

const Cursor = () => {
	const { x, y } = useMousePosition();

	const mvX = useMotionValue(x - 20);
	const mvY = useMotionValue(y - 20);

	const smoothX = useSpring(mvX, { stiffness: 80, damping: 15 });
	const smoothY = useSpring(mvY, { stiffness: 80, damping: 15 });

	const scaleX = useSpring(1, { stiffness: 300, damping: 30 });
	const scaleY = useSpring(1, { stiffness: 300, damping: 30 });

	useEffect(() => {
		const dx = x - mvX.get();
		const dy = y - mvY.get();

		mvX.set(x - 20);
		mvY.set(y - 20);

		const dist = Math.sqrt(dx * dx + dy * dy);
		const stretch = Math.min(dist / 100, 0.15);

		scaleX.set(0.8 + stretch);
		scaleY.set(0.8 - stretch);

		const timeout = setTimeout(() => {
			scaleX.set(1);
			scaleY.set(1);
		}, 50);

		return () => clearTimeout(timeout);
	}, [x, y, mvX, mvY, scaleX, scaleY]);

	return (
		<>
			<motion.div
				className="fixed mix-blend-difference bg-blue-400 size-10 rounded-full shadow-[0px_0px_13px_7px] shadow-blue-400"
				style={{
					x: smoothX,
					y: smoothY,
					scaleX,
					scaleY,
					transform: "translate(-50%, -50%)",
				}}
			/>
			<motion.div
				className="fixed mix-blend-difference bg-blue-400 size-10 rounded-full shadow-md "
				style={{
					x: smoothX,
					y: smoothY,
					scaleX,
					scaleY,
					transform: "translate(-50%, -50%)",
				}}
			/>
		</>
	);
};

export default Cursor;
