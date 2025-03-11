import { useState, useRef, useEffect } from "react";

export default function Otp() {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const [isVerifying, setIsVerifying] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	// Initialize refs array
	useEffect(() => {
		inputRefs.current = inputRefs.current.slice(0, 6);
	}, []);

	const handleChange = (element, index) => {
		const value = element.value;

		// Only allow numbers
		if (!/^[0-9]$/.test(value) && value !== "") return;

		// Update the OTP state
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Clear any previous errors
		setError("");

		// Auto-focus to next input if value is entered
		if (value !== "" && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (e, index) => {
		// Handle backspace
		if (e.key === "Backspace") {
			if (otp[index] === "" && index > 0) {
				// Focus previous input when backspace is pressed on empty input
				inputRefs.current[index - 1].focus();
			}
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").trim();

		// Check if pasted content is numeric and has appropriate length
		if (!/^\d+$/.test(pastedData)) {
			setError("Please paste numbers only");
			return;
		}

		// Take first 6 characters if longer
		const digits = pastedData.slice(0, 6).split("");

		// Fill the OTP fields
		const newOtp = [...otp];
		digits.forEach((digit, index) => {
			if (index < 6) newOtp[index] = digit;
		});

		setOtp(newOtp);

		// Focus on the next empty field or the last field
		const lastFilledIndex = Math.min(digits.length - 1, 5);
		if (inputRefs.current[lastFilledIndex]) {
			inputRefs.current[lastFilledIndex].focus();
		}
	};

	const verifyOtp = async () => {
		// Check if OTP is complete
		if (otp.some((digit) => digit === "")) {
			setError("Please enter the complete 6-digit OTP");
			return;
		}

		setIsVerifying(true);
		setError("");

		try {
			// For demo purposes - replace with actual API call
			// Example: const response = await fetch('https://petapp.billilo.com/petapp/verify-otp/', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify({ otp: otp.join('') })
			// });

			// Simulating API response
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// For demo: 123456 is considered a valid OTP
			if (otp.join("") === "123456") {
				setSuccess(true);
			} else {
				setError("Invalid OTP. Please try again.");
			}
		} catch (err) {
			setError("Failed to verify OTP. Please try again.",err);
		} finally {
			setIsVerifying(false);
		}
	};

	const resendOtp = () => {
		// Simulating OTP resend
		setOtp(["", "", "", "", "", ""]);
		setError("");
		setSuccess(false);

		// Focus on first input
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}

		// Show message for demo purposes
		alert("New OTP has been sent to your device!");
	};

	return (
		<div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
			<h2 className="text-2xl font-bold mb-6">Verify OTP</h2>

			<div className="mb-8">
				<p className="text-gray-600 text-center mb-4">
					Enter the 6-digit code sent to your device
				</p>

				<div className="flex gap-2 mb-4">
					{otp.map((digit, index) => (
						<input
							key={index}
							type="text"
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(e.target, index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							onPaste={handlePaste}
							ref={(ref) => {
								if (ref) inputRefs.current[index] = ref;
							}}
							className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							autoFocus={index === 0}
						/>
					))}
				</div>

				{error && (
					<p className="text-red-500 text-sm text-center mb-4">{error}</p>
				)}

				{success && (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
						OTP verified successfully!
					</div>
				)}
			</div>

			<div className="flex flex-col w-full gap-4">
				<button
					onClick={verifyOtp}
					disabled={isVerifying || success}
					className={`w-full py-3 rounded-md font-medium text-white ${
						isVerifying || success
							? "bg-blue-300"
							: "bg-blue-600 hover:bg-blue-700"
					}`}
				>
					{isVerifying ? "Verifying..." : success ? "Verified" : "Verify OTP"}
				</button>

				<div className="text-center">
					<button
						onClick={resendOtp}
						disabled={isVerifying}
						className="text-blue-600 hover:text-blue-800 font-medium"
					>
						Resend OTP
					</button>
				</div>
			</div>
		</div>
	);
}
