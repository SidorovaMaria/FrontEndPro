import { useEffect, useRef, useState } from "react";

interface MousePosition {
	x: number;
	y: number;
}

const useMousePosition = (): MousePosition => {
	const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
	const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

	useEffect(() => {
		const updateMouse = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};

		let frameId: number;
		const update = () => {
			setPosition((prev) => {
				const next = mouseRef.current;
				if (prev.x !== next.x || prev.y !== next.y) {
					return next;
				}
				return prev;
			});
			frameId = requestAnimationFrame(update);
		};

		window.addEventListener("mousemove", updateMouse);
		frameId = requestAnimationFrame(update);

		return () => {
			window.removeEventListener("mousemove", updateMouse);
			cancelAnimationFrame(frameId);
		};
	}, []);

	return position;
};

export default useMousePosition;
