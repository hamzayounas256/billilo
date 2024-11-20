import { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { toast } from "react-toastify";

export default function Signup() {
	const { navigate } = useContext(AnimalContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm();

	const onSubmitHandler = async (data) => {
		// console.log(data);
		try {
			// API request
			const response = await axios.post(
				"https://petapp1503.pythonanywhere.com/petapp/register-user/",
				{
					first_name: data.first_name,
					last_name: data.last_name,
					email: data.email,
					country: data.country,
					phone_no: data.phone_no,
					password: data.password,
					confirm_password: data.confirm_password,
					profile_img: data.profile_img[0],
				},
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			// console.log(response);
			if (response.status === 200) {
				reset();
				toast.success("Registration successful! Please log in.");
				// console.log(response.data);
				navigate("/login");
			} else {
				toast.error(response.message);
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				reset();
				toast.error(error.response.data.message || "Registration failed.");
			} else {
				toast.error("An error occurred during signup. Please try again.");
			}
		}
	};

	const onInvalidHandler = () => {
		// Display validation errors in toast
		Object.keys(errors).forEach((field) => {
			toast.error(errors[field]?.message || `${field} is invalid.`);
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler, onInvalidHandler)}
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"
		>
			<div className="inline-flex items-center gap-2 mb-2 mt-10">
				<p className="prata-regular text-3xl">Sign Up</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			{/* First Name and Last Name */}
			<div className="w-full flex justify-between gap-2">
				<input
					type="text"
					className={`w-1/2 px-3 py-2 border ${
						errors.first_name ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="First Name"
					{...register("first_name", { required: "First Name is required" })}
				/>
				<input
					type="text"
					className={`w-1/2 px-3 py-2 border ${
						errors.last_name ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Last Name"
					{...register("last_name", { required: "Last Name is required" })}
				/>
			</div>

			{/* Email */}
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

			{/* Phone Number and Country */}
			<div className="w-full flex justify-between gap-2">
				<input
					type="text"
					className={`w-1/2 px-3 py-2 border ${
						errors.phone_no ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Phone Number"
					{...register("phone_no", {
						required: "Phone Number is required",
						minLength: {
							value: 11,
							message: "Phone Number must be at least 11 characters",
						},
						maxLength: {
							value: 12,
							message: "Phone Number cannot exceed 12 characters",
						},
						pattern: {
							value: /^[0-9]+$/,
							message: "Phone Number must contain only numbers",
						},
					})}
				/>
				<input
					type="text"
					className={`w-1/2 px-3 py-2 border ${
						errors.country ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Country"
					{...register("country", { required: "Country is required" })}
				/>
			</div>

			{/* Password and Confirm Password */}
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
			<input
				type="password"
				className={`w-full px-3 py-2 border ${
					errors.confirm_password ? "border-red-500" : "border-gray-800"
				}`}
				placeholder="Confirm Password"
				{...register("confirm_password", {
					required: "Please confirm your password",
					validate: (value) =>
						value === getValues("password") || "Passwords do not match",
				})}
			/>

			{/* Profile Image */}
			<input
				type="file"
				className={`w-full px-3 py-2 border ${
					errors.profile_img ? "border-red-500" : "border-gray-800"
				}`}
				{...register("profile_img", {
					required: "Profile image is required",
				})}
			/>

			<div className="w-full flex justify-between text-sm mt-[-8px]">
				<p className="cursor-pointer">Forgot Your Password?</p>
				<p className="cursor-pointer" onClick={() => navigate("/login")}>
					Login Here
				</p>
			</div>
			<button className="bg-black text-white font-light px-8 py-2 mt-4">
				Sign Up
			</button>
		</form>
	);
}
