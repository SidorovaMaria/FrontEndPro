import { Quote, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
type Quote = {
	q: string;
	a: string;
};
const RandomQuote = () => {
	const [quote, setQuote] = useState<Quote | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const fetchQuote = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/random"); // Use /api to hit the proxy

			if (res.ok) {
				const data = await res.json();
				setQuote(data[0]);
			} else {
				setError("Failed to fetch quote");
			}
		} catch (e) {
			setError(`Failed to fetch quote,${e instanceof Error ? e.message : "Unknown error"}`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	return (
		<div className="px-8 md:px-0 w-screen flex-center h-[calc(100vh-80px)]  relative font-Poppins">
			<div className="flex-center flex-col gap-4 bg-gradient-to-b from-blue-200/50 to-blue-400/50 p-8 rounded-3xl shadow-lg max-w-2xl">
				<Quote size={32} className="fill-blue-900 text-[#192e75]" />
				<h1 className="text-xl font-bold text-center max-w-2/3 italic">
					{loading ? "Loading..." : error ? error : quote?.q}
				</h1>
				<hr className="border-blue-100 w-2/3" />
				<p className=" text-lg font-bold tracking-wider italic  text-center text-blue-900">
					{loading ? "" : error ? "" : quote?.a}
				</p>
				<div className="flex flex-row-reverse w-full justify-between px-4">
					<button
						className="bg-blue-200/50 text-white px-4 py-2 rounded-lg cursor-pointer font-semibold tracking-wider hover:bg-blue-900 transition duration-300"
						onClick={fetchQuote}
					>
						{!loading && "New Quote"}{" "}
					</button>
					<a
						href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
							`"${quote?.q}" - ${quote?.a}`
						)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="bg-blue-200/50 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-900 transition duration-300"
					>
						{!loading && <Twitter className="fill-white" />}
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomQuote;
