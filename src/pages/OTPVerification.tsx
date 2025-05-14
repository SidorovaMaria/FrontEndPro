import React, { useState } from "react";
import { toast } from "react-toastify";
import AboutChallenge from "../components/AboutChallenge";

const OTPVerification = () => {
	const [otpCode, setOtpCode] = useState(["", "", "", ""]);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value;
		if (/^[0-9]$/.test(value) || value === "") {
			const newOtpCode = [...otpCode];
			newOtpCode[index] = value;
			setOtpCode(newOtpCode);
			if (value && index < 3) {
				const nextInput = document.querySelector(
					`input:nth-child(${index + 2})`
				) as HTMLInputElement;
				nextInput.focus();
			}
		}
	};
	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text/plain");
		if (/^\d{4}$/.test(pastedData)) {
			setOtpCode(pastedData.split(""));
			const nextInput = document.querySelector(`input:nth-child(4)`) as HTMLInputElement;
			nextInput.focus();
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === "Backspace" && index > 0) {
			const newOtpCode = [...otpCode];
			newOtpCode[index] = "";
			setOtpCode(newOtpCode);
			const prevInput = document.querySelector(
				`input:nth-child(${index})`
			) as HTMLInputElement;
			prevInput.focus();
		}
		if (e.key === "ArrowLeft" && index > 0) {
			const prevInput = document.querySelector(
				`input:nth-child(${index})`
			) as HTMLInputElement;
			prevInput.focus();
		}
		if (e.key === "ArrowRight" && index < 3) {
			const nextInput = document.querySelector(
				`input:nth-child(${index + 2})`
			) as HTMLInputElement;
			nextInput.focus();
		}
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (otpCode.some((code) => code === "")) {
			toast.error("Please fill all the OTP fields");
			return;
		}

		toast(`OTP Code: ${otpCode.join("")}`);
	};

	return (
		<div className="px-8 md:px-0 w-screen flex-center h-[calc(100vh-80px)] font-merriweather  relative">
			<div className="flex flex-col gap-6 rounded-[25px] bg-[#252b42] shadow-[0px_10px_25px_-15px] shadow-[#111628] px-18 lg:px-24 pt-20 pb-15 ">
				<div className="flex flex-col items-center text-center gap-1.5">
					<h1 className="text-[26px] font-bold text-[#b1b9d8]">
						Verify your email address
					</h1>
					<p className="text-[14px] max-w-[493px] text-[#8795c5]">
						A four-digit code has been sent to your email name@frontendpro.dev. Please
						enter the code below to verify your email address.
					</p>
				</div>
				<aside className="flex gap-8 items-center justify-center">
					{Array.from({ length: 4 }, (_, index) => (
						<input
							key={index}
							type="text"
							inputMode="numeric"
							pattern="[0-9]*"
							autoComplete="one-time-code"
							autoFocus={index === 0}
							maxLength={1}
							value={otpCode[index]}
							onPaste={handlePaste}
							className={`w-[85px] h-[100px] md:w-[130px] md:h-[150px] lg:w-[173px] lg:h-[208px] text-4xl md:text-[80px] lg:text-[128px] font-bold text-center
                            placeholder:text-[#2e3650] font-merriweather rounded-[10px]
                             border-[#2e3650] bg-[#1a2036] border-2
                            focus:bg-[#1a20366b]  focus:border-[1px] focus:outline-none text-[#B1B9D8]
                            ${otpCode[index] ? "border-[#B1B9D8]" : ""}`}
							placeholder="0"
							onChange={(e) => {
								handleChange(e, index);
							}}
							onKeyDown={(e) => {
								handleKeyDown(e, index);
							}}
						/>
					))}
				</aside>
				<button
					onClick={handleSubmit}
					className="py-4 w-[400px] border border-transparent mt-3 mx-auto rounded-[16px] bg-[#1a2036]
                shadow-[0px_4px_0px] shadow-[#2E3650] font-medium md:text-lg font-Poppins
                hover:brightness-150 hover:border-[#8795c5] active:border-transparent active:brightness-100 transition-all duration-300 ease-in-out cursor-pointer"
				>
					Verify OTP
				</button>
			</div>
			<AboutChallenge
				name="OTP Verification Component"
				link="https://www.frontendpro.dev/frontend-coding-challenges/otp-verification-component-UiMLpAugWbrGYBzXAcly"
				level="Intermediate"
			/>
		</div>
	);
};

export default OTPVerification;
