import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function Login() {
	const { navigate } = useContext(AnimalContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmitHandler = async (data) => {
		try {
			const response = await axios.post(
				"https://petapp1503.pythonanywhere.com/petapp/login/",
				{
					email: data.email,
					password: data.password,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded", // Make sure this matches your backend's expected content type
					},
				}
			);
			// console.log(response);
			// Check if login is successful
			if (response.data.success) {
				const { access_token, refresh_token, first_name, email, id, image } =
					response.data.data;

				reset();

				// Store tokens in localStorage
				localStorage.setItem("access_token", access_token);
				localStorage.setItem("refresh_token", refresh_token);
				localStorage.setItem("user_name", first_name);
				localStorage.setItem("id", id);
				localStorage.setItem("user_email", email);
				localStorage.setItem("userImg", image);

				// Navigate to dashboard on success
				navigate("/");

				toast.success("Login successful!");
			} else {
				// Handle login failure
				toast.error("Login failed. Please check your credentials.");
			}
		} catch (error) {
			// Handle API call failure
			console.error("Login failed:", error.message);
			toast.error("An error occurred during login. Please try again.");
		}
	};

	// Show validation errors using toast
	if (errors.email) {
		toast.error(errors.email.message); // Display email error in toast
	}
	if (errors.password) {
		toast.error(errors.password.message); // Display password error in toast
	}

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-orange-500"
			>
				<motion.div
					variants={fadeIn("down", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="inline-flex items-center gap-2 mb-2 mt-10"
				>
					<p className="prata-regular text-3xl">Login</p>
					<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
				</motion.div>

				{/* Email Input */}
				<motion.input
					variants={fadeIn("up", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					type="email"
					className={`w-full px-3 py-2 border ${
						errors.email ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Email Address"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							message: "Invalid email address",
						},
					})}
				/>

				{/* Password Input */}
				<motion.input
					variants={fadeIn("up", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					type="password"
					className={`w-full px-3 py-2 border ${
						errors.password ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Password"
					{...register("password", {
						required: "Password is required",
						// minLength: {
						// 	value: 8,
						// 	message: "Password must be at least 8 characters",
						// },
					})}
				/>

				<div className="w-full flex justify-between text-sm mt-[-8px]">
					<p className="cursor-pointer">Forgot Your Password?</p>

					<p className="cursor-pointer" onClick={() => navigate("/signup")}>
						Are You a New Member?
					</p>
				</div>

				<motion.button
					variants={fadeIn("up", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="bg-black text-white font-light px-8 py-2 mt-4"
					type="submit"
				>
					Login
				</motion.button>
			</form>
		</>
	);
}
