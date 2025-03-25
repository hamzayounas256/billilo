import { useState, useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AnimalContext } from "../context/AnimalContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function OtpVerification() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const [otp, setOtp] = useState(["", "", "", ""]);
	const [timer, setTimer] = useState(60);
	const [canResend, setCanResend] = useState(false);
	const [isVerifying, setIsVerifying] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const location = useLocation();
	const inputRefs = useRef([]);
	const timerIntervalRef = useRef(null);

	// Phone number or email from previous navigation state
	const contactInfo = location.state?.contactInfo || "your device";

	// Start timer when component mounts or OTP is resent
	const startTimer = () => {
		setTimer(1);
		setCanResend(false);

		if (timerIntervalRef.current) {
			clearInterval(timerIntervalRef.current);
		}

		timerIntervalRef.current = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer <= 1) {
					clearInterval(timerIntervalRef.current);
					setCanResend(true);
					return 0;
				}
				return prevTimer - 1;
			});
		}, 1000);
	};

	// Initialize timer on component mount
	useEffect(() => {
		startTimer();

		// Cleanup interval on component unmount
		return () => {
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
		};
	}, []);

	// Handle OTP input change
	const handleChange = (element, index) => {
		const value = element.value;

		// Only allow numbers
		if (!/^[0-9]$/.test(value) && value !== "") return;

		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		setError("");

		// Auto-focus to next input if value is entered
		if (value !== "" && index < 3) {
			inputRefs.current[index + 1].focus();
		}
	};

	// Handle backspace functionality
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace") {
			if (otp[index] === "" && index > 0) {
				inputRefs.current[index - 1].focus();
			}
		}
	};

	// Handle paste functionality
	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").trim();

		// Check if pasted content is numeric and has appropriate length
		if (!/^\d+$/.test(pastedData)) {
			setError("Please paste numbers only");
			toast.error("Please paste numbers only");
			return;
		}

		// Take first 4 characters if longer
		const digits = pastedData.slice(0, 4).split("");

		const newOtp = [...otp];
		digits.forEach((digit, index) => {
			if (index < 4) newOtp[index] = digit;
		});

		setOtp(newOtp);

		// Focus on the next empty field or the last field
		const lastFilledIndex = Math.min(digits.length - 1, 3);
		if (inputRefs.current[lastFilledIndex]) {
			inputRefs.current[lastFilledIndex].focus();
		}
	};

	// Verify OTP
	const verifyOtp = async () => {
		// Check if OTP is complete
		if (otp.some((digit) => digit === "")) {
			setError("Please enter the complete 4-digit OTP");
			toast.error("Please enter the complete 4-digit OTP");
			return;
		}

		setIsVerifying(true);
		setError("");

		try {
			// Replace with your actual API call
			const response = await axios.post(
				apiLink + "/verify-otp/",
				{ otp: otp.join("") },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			// console.log(response);
			await response;
			if (response.data.success) {
				setSuccess(true);
				VerifyRegister();
				toast.success(response.data.message);
				navigate("/Login");
			} else {
				// Handle API-specific error messages
				toast.error(response.data.message || "Invalid OTP. Please try again.");
			}
		} catch (err) {
			toast.error("Network error. Please try again.", err);
			// console.log("Network error. Please try again.", err);
		} finally {
			setIsVerifying(false);
		}
	};

	const VerifyRegister = async () => {
		if (!canResend) return;
		const fetchUserRegisterData = location.state;
		// console.log(fetchUserRegisterData);

		try {
			// Replace with your actual resend OTP API call
			const response = await axios.post(
				apiLink + "/register-user/",
				fetchUserRegisterData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			if (response.status === 200) {
				toast.success("Welcome ", fetchUserRegisterData.first_name);
			}
		} catch (err) {
			toast.error("Failed to resend OTP. Please try again.", err);
		}
	};

	// Resend OTP
	const resendOtp = async () => {
		if (!canResend) return;
		const fetchUserRegisterData = location.state;
		// console.log(fetchUserRegisterData);

		try {
			// Replace with your actual resend OTP API call
			await axios.post(apiLink + "/register-user/", fetchUserRegisterData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// Reset OTP fields
			setOtp(["", "", "", ""]);
			setError("");
			toast.success("Otp sent successfully");

			// Restart timer
			startTimer();

			// Focus on first input
			if (inputRefs.current[0]) {
				inputRefs.current[0].focus();
			}
		} catch (err) {
			toast.error("Failed to resend OTP. Please try again.", err);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center p-4">
			<div className="w-full max-w-md rounded-lg p-8">
				<h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

				<p className="text-gray-600 text-center mb-6">
					Enter the 4-digit code sent to {contactInfo}
				</p>

				<div className="flex justify-center gap-3 mb-6">
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
							className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-md 
                focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none 
                transition-all duration-200"
							autoFocus={index === 0}
						/>
					))}
				</div>

				{error && (
					<div className="text-red-500 text-sm text-center mb-4">{error}</div>
				)}

				{success && (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
						OTP verified successfully!
					</div>
				)}

				<div className="flex flex-col space-y-4">
					<button
						onClick={verifyOtp}
						disabled={isVerifying || success}
						className={`w-full py-3 rounded-md font-semibold text-white transition-colors duration-300 
              ${
								isVerifying || success
									? "bg-gray-400 cursor-not-allowed"
									: "bg-orange-600 hover:bg-orange-700"
							}`}
					>
						{isVerifying ? "Verifying..." : success ? "Verified" : "Verify OTP"}
					</button>

					<div className="text-center">
						<button
							onClick={resendOtp}
							disabled={!canResend}
							className={`text-orange-600 font-medium hover:text-orange-800 
                ${canResend ? "opacity-100" : "opacity-50 cursor-not-allowed"}`}
						>
							{canResend ? "Resend OTP" : `Resend OTP in ${timer} seconds`}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
