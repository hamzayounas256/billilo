import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { toast } from "react-toastify"; // Import ToastContainer and toast

export default function Login() {
	const { navigate } = useContext(AnimalContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmitHandler = async (data) => {
		try {
			const response = await axios.post(
				"https://petapp1503.pythonanywhere.com/petapp/login/",
				{
					email: data.email,
					password: data.password,
				}
			);

			// Check if login is successful
			if (response.data.success) {
				const { access_token, refresh_token, first_name, email } =
					response.data.data;

				// Store tokens in localStorage
				localStorage.setItem("access_token", access_token);
				localStorage.setItem("refresh_token", refresh_token);
				localStorage.setItem("user_name", first_name);
				localStorage.setItem("user_email", email);

				// Navigate to dashboard on success
				navigate("/dashboard");

				toast.success("Login successful!");
			} else {
				// Handle login failure
				toast.error("Login failed. Please check your credentials.");
			}
		} catch (error) {
			// Handle API call failure
			console.error("Login failed:", error.response?.data || error.message);
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
				className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"
			>
				<div className="inline-flex items-center gap-2 mb-2 mt-10">
					<p className="prata-regular text-3xl">Login</p>
					<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
				</div>

				{/* Email Input */}
				<input
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
				<input
					type="password"
					className={`w-full px-3 py-2 border ${
						errors.password ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Password"
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>

				<div className="w-full flex justify-between text-sm mt-[-8px]">
					<p className="cursor-pointer">Forgot Your Password?</p>

					<p className="cursor-pointer" onClick={() => navigate("/signup")}>
						Create Account
					</p>
				</div>

				<button
					className="bg-black text-white font-light px-8 py-2 mt-4"
					type="submit"
				>
					Login
				</button>
			</form>
		</>
	);
}
