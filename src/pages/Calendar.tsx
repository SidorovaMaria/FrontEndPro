import { useFormik } from "formik";
import { ChevronLeft, ChevronRight, CircleAlert, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as Yup from "yup";
import { useEffect, useState } from "react";

type EventType = {
	title: string;
	description: string;
	time: string;
	date: Date | null;
	tagColor: string;
};
type DayType = {
	date: Date;
	currentMonth: boolean;
	month: number;
	number: number;
	selected: boolean;
	year: number;
	events: EventType[];
};
const colors = ["#FF595E", "#FF924C", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#FF6F20"];
const randomColor = (): string => {
	return colors[Math.floor(Math.random() * colors.length)] || colors[0];
};
const Calendar = () => {
	const [today] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [currentDays, setCurrentDays] = useState<DayType[]>([]);
	const [createEventModal, setCreateEventModal] = useState<{
		open: boolean;
		date: Date | null;
	}>({
		open: false,
		date: null,
	});
	const [openEventInfo, setOpenEventInfo] = useState<{
		open: boolean;
		event: EventType | null;
	}>({
		open: false,
		event: null,
	});

	useEffect(() => {
		const firstDayofMonth = new Date(currentYear, currentMonth, 1);
		const weekdayOfFirstDay = firstDayofMonth.getDay();
		const startDate = new Date(firstDayofMonth);
		startDate.setDate(firstDayofMonth.getDate() - weekdayOfFirstDay);

		const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

		const days = [];
		for (let i = 0; i < 35; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);

			const dayEvents = storedEvents.filter(
				(event: EventType) =>
					event.date && new Date(event.date).toDateString() === date.toDateString()
			);

			days.push({
				currentMonth: date.getMonth() === currentMonth,
				date,
				month: date.getMonth(),
				number: date.getDate(),
				selected: date.toDateString() === today.toDateString(),
				year: date.getFullYear(),
				events: dayEvents,
			});
		}

		setCurrentDays(days);
	}, [currentMonth, currentYear, today]);

	const monthName = new Date(currentYear, currentMonth).toLocaleString("en-US", {
		month: "long",
	});

	const handlePrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear((prev) => prev - 1);
		} else {
			setCurrentMonth((prev) => prev - 1);
		}
	};

	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear((prev) => prev + 1);
		} else {
			setCurrentMonth((prev) => prev + 1);
		}
	};

	const eventFomrik = useFormik({
		initialValues: {
			title: "",
			description: "",
			tagColor: randomColor(),
			time: "",
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().required("Title is required"),

			time: Yup.string().required("Time is required"),
		}),
		onSubmit: (values) => {
			if (localStorage.getItem("events")) {
				localStorage.setItem(
					"events",
					JSON.stringify([
						...JSON.parse(localStorage.getItem("events")!),
						{ ...values, date: createEventModal.date },
					])
				);
			} else {
				localStorage.setItem(
					"events",
					JSON.stringify([{ ...values, date: createEventModal.date }])
				);
			}
			setCreateEventModal({ open: false, date: null });

			setCurrentDays((prev) =>
				prev.map((day) => {
					if (day.date.toDateString() === createEventModal.date?.toDateString()) {
						return {
							...day,
							events: [
								...day.events,
								{
									...values,
									time: values.time,
									date: createEventModal.date,
									tagColor: values.tagColor,
								},
							],
						};
					}
					return day;
				})
			);
			eventFomrik.resetForm();
			setCreateEventModal({ open: false, date: null });
		},
	});

	return (
		<div className="px-8 md:px-0 w-screen flex-center h-[calc(100vh-80px)] relative font-monteserrat">
			<div className="w-3/5 aspect-square flex flex-col gap-6 bg-light-shades p-8 rounded-3xl shadow-lg max-w-2xl">
				<div className="flex items-center justify-between w-full">
					<h1 className="text-[26px] font-bold text-primary tracking-wider italic">
						{monthName} {currentYear}
					</h1>
					<div className="flex gap-2 text-primary">
						<ChevronLeft
							className="cursor-pointer"
							size={28}
							onClick={handlePrevMonth}
						/>
						<ChevronRight
							className="cursor-pointer"
							size={28}
							onClick={handleNextMonth}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7 gap-3">
					{Array.from({ length: 7 }, (_, index) => (
						<div key={index} className="text-lg font-bold text-primary text-center">
							{new Date(0, 0, index + 1).toLocaleString("en-US", {
								weekday: "short",
							})}
						</div>
					))}
					{currentDays.map((day) => (
						<div
							key={day.date.toString()}
							onClick={() =>
								setCreateEventModal((prev) => ({
									...prev,
									open: true,
									date: day.date,
								}))
							}
							className={`flex-center text-lg  text-primary font-semibold text-center w-full aspect-square rounded-full cursor-pointer hover:bg-blue-900/20 hover:text-white transition-all duration-150 ease-in relative group overflow-visible ${
								!day.currentMonth ? "opacity-40" : ""
							} ${day.selected ? "bg-primary! text-white text-xl font-bold" : ""}`}
						>
							{day.number}
							{day.events.length > 0 && (
								<div className="absolute top-0 left-1 flex flex-col gap-1 max-h-15 overflow-y-auto overflow-x-visible p-1 w-full">
									{day.events.map((event, index) => (
										<div
											onClick={(e) => {
												e.stopPropagation();
												setOpenEventInfo({ open: true, event });
											}}
											key={index}
											className={`group/circle px-2 w-4 h-4 rounded-sm hover:scale-150 hover:w-fit relative transition-all duration-150 ease-in-out flex-center
                                                `}
											style={{
												backgroundColor: event.tagColor,
											}}
										>
											<p className="opacity-0 group-hover/circle:opacity-109 text-[10px] text-white font-semibold">
												{event.time}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<AnimatePresence>
				{createEventModal.open && (
					<motion.div
						className="fixed inset-0 bg-black/50 z-10"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						onClick={() => setCreateEventModal({ open: false, date: null })}
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-2/5 p-8 rounded-2xl z-20 flex flex-col gap-8
                            shadow-[10px_10px_5px_3px] shadow-white/50"
						>
							<div className="flex  items-center justify-between w-full">
								<h1 className="text-primary text-xl capitalize font-bold">
									Add an Event{" "}
								</h1>
								<button
									className="text-primary font-bold text-lg"
									onClick={() => setCreateEventModal({ open: false, date: null })}
								>
									<X />
								</button>
							</div>
							<form
								className="flex flex-col gap-4"
								onSubmit={eventFomrik.handleSubmit}
							>
								<div className="flex flex-col gap-2 w-full">
									<div className="flex items-center gap-4 w-full ">
										<label
											htmlFor="title"
											className="text-primary font-semibold whitespace-nowrap"
										>
											Event Title:
										</label>
										<input
											type="text"
											name="title"
											placeholder="e.g. Birthday Party"
											className={`w-full border-b font-semibold border-blue-800 outline-none placeholder:font-normal px-1
                                                                            text-blue-950 placeholder::text-xs focus:border-b-2 
                                                                            ${
																				eventFomrik.errors
																					.title &&
																				eventFomrik.touched
																					.title
																					? "border-red-500"
																					: ""
																			}`}
											onBlur={eventFomrik.handleBlur}
											onChange={eventFomrik.handleChange}
											value={eventFomrik.values.title}
										/>
										<div
											onClick={() =>
												eventFomrik.setFieldValue("tagColor", randomColor())
											}
											style={{
												backgroundColor: eventFomrik.values.tagColor,
											}}
											className={`w-8 border-black border-1 aspect-square rounded-full cursor-pointer transition-colors duration-150`}
										></div>
									</div>
									{eventFomrik.errors.title && eventFomrik.touched.title && (
										<div className="flex items-center gap-1 text-red-500 text-xs font-bold ml-auto">
											<CircleAlert size={16} />{" "}
											<p>{eventFomrik.errors.title}</p>
										</div>
									)}
								</div>
								<div className="flex flex-col gap-2 w-full">
									<label
										htmlFor="description"
										className="text-primary font-semibold whitespace-nowrap"
									>
										Notes:
									</label>
									<textarea
										name="description"
										placeholder="e.g Don't forget to bring the cake"
										className="border border-blue-800 rounded-lg p-2 placeholder:font-normal focus:outline-none focus:border-2 focus:
                                        text-blue-950 placeholder::text-xs"
										onChange={eventFomrik.handleChange}
										value={eventFomrik.values.description}
									/>
								</div>
								<div className="flex flex-col gap-2 w-full">
									<div className="flex items-center justify-between gap-4 w-full">
										<label
											htmlFor="date"
											className="text-primary font-semibold whitespace-nowrap"
										>
											{createEventModal.date?.toLocaleDateString("en-US", {
												day: "numeric",
												month: "short",
												year: "numeric",
											})}
										</label>
										<input
											type="time"
											name="time"
											className="border border-blue-800 rounded-lg px-3 py-2 placeholder:font-normal focus:outline-none focus:border-2 focus:
                                                                            text-blue-950 placeholder::text-xs"
											onChange={eventFomrik.handleChange}
											onBlur={eventFomrik.handleBlur}
											value={eventFomrik.values.time}
										/>
									</div>
									{eventFomrik.errors.time && eventFomrik.touched.time && (
										<div className="flex items-center gap-1 text-red-500 text-xs font-bold aright-0">
											<CircleAlert size={16} />{" "}
											<p>{eventFomrik.errors.time}</p>{" "}
										</div>
									)}
								</div>
								<button
									type="submit"
									className="bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition-all duration-150 ease-in-out"
								>
									Add Event
								</button>
							</form>
						</div>
					</motion.div>
				)}
				{openEventInfo.open && (
					<motion.div
						className="fixed inset-0 bg-black/50 z-10"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						onClick={() => setOpenEventInfo({ open: false, event: null })}
					>
						<motion.div
							initial={{
								scaleX: 0,
								opacity: 0,
							}}
							animate={{
								scaleX: 1,
								opacity: 1,
								transition: {
									scaleX: {
										delay: 0.2,
									},
									type: "spring",
									duration: 1,
								},
							}}
							exit={{
								scaleX: 0,
								opacity: 0,
								transition: {
									opcaity: {
										delay: 0.2,
									},
									type: "spring",
									duration: 1,
								},
							}}
							onClick={(e) => e.stopPropagation()}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-2/5 p-9 rounded-2xl z-20 flex flex-col gap-2 text-dark-shades "
						>
							<div className="flex items-center justify-between w-full">
								<div className="text-xl font-bold text-center flex items-center gap-1">
									<span
										className="w-4 h-4 rounded-full inline-block text-center"
										style={{ backgroundColor: openEventInfo.event?.tagColor }}
									/>
									<h1>{openEventInfo.event?.title}</h1>
								</div>
								<p className=" font-semibold text-gray-500">
									{openEventInfo.event?.date &&
										new Date(openEventInfo.event.date).toLocaleDateString(
											"en-US",
											{
												day: "numeric",
												month: "short",
												year: "numeric",
											}
										)}
									<span className="ml-2 font-bold text-xl ">
										{openEventInfo?.event?.time}
									</span>
								</p>
							</div>
							<div className="flex items-end justify-between w-full">
								<p className="text-gray-500 text-sm font-semibold">
									{openEventInfo.event?.description}
								</p>
							</div>
							<button
								onClick={() => {
									if (openEventInfo.event) {
										setCurrentDays((prev) =>
											prev.map((day) => {
												if (
													day.date.toDateString() ===
													new Date(
														openEventInfo.event.date
													).toDateString()
												) {
													return {
														...day,
														events: day.events.filter(
															(event) => event !== openEventInfo.event
														),
													};
												}
												return day;
											})
										);

										const storedEvents = JSON.parse(
											localStorage.getItem("events") || "[]"
										);
										const updatedEvents = storedEvents.filter(
											(event: EventType) =>
												!(
													event.title === openEventInfo.event?.title &&
													event.time === openEventInfo.event?.time
												)
										);
										localStorage.setItem(
											"events",
											JSON.stringify(updatedEvents)
										);
									}
									setOpenEventInfo({ open: false, event: null });
								}}
								className="bg-red-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-red-700 transition-all duration-150 ease-in-out w-1/3 mx-auto"
							>
								Delete Event
							</button>
							<X
								className="absolute top-2 right-2 cursor-pointer hover:bg-red-500 hover:text-white rounded-md"
								onClick={() => setOpenEventInfo({ open: false, event: null })}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Calendar;
