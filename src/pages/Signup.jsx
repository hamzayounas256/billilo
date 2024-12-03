import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function Signup() {
	const { navigate, apiLink } = useContext(AnimalContext);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
				apiLink + "/register-user/",
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
				toast.success(
					response.data.message || "Registration successful! Please log in."
				);
				// console.log(response.data);
				navigate("/login");
			} else {
				toast.error(response.data.message || "Registration Failed");
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
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
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-10 gap-4 text-orange-500"
		>
			<motion.div
				variants={fadeIn("down", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="inline-flex items-center gap-2 mb-2 mt-10"
			>
				<p className="prata-regular text-3xl">Sign Up</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</motion.div>

			{/* First Name and Last Name */}
			<motion.div
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="w-full flex justify-between gap-2"
			>
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
			</motion.div>

			{/* Email */}
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

			{/* Phone Number and Country */}
			<motion.div
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="w-full flex justify-between gap-2"
			>
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
							value: 13,
							message: "Phone Number cannot exceed 13 characters",
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
			</motion.div>

			{/* Password */}
			<motion.div
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="w-full relative"
			>
				<input
					type={showPassword ? "text" : "password"}
					className={`w-full px-3 py-2 border ${
						errors.password ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="New Password"
					{...register("password", {
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>
				<span
					className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</motion.div>

			{/* Confirm Password */}
			<motion.div
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="w-full relative"
			>
				<input
					type={showConfirmPassword ? "text" : "password"}
					className={`w-full px-3 py-2 border ${
						errors.confirm_password ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Confirm Password"
					{...register("confirm_password", {
						validate: (value) =>
							value === getValues("password") || "Passwords do not match",
					})}
				/>
				<span
					className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
					onClick={() => setShowConfirmPassword((prev) => !prev)}
				>
					{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</motion.div>

			{/* Profile Image */}
			<motion.input
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				type="file"
				className={`w-full px-3 py-2 border ${
					errors.profile_img ? "border-red-500" : "border-gray-800"
				}`}
				{...register("profile_img", {
					required: "Profile image is required",
				})}
			/>

			<div className="w-full flex justify-between text-sm mt-[-8px]">
				{/* <p className="cursor-pointer">Forgot Your Password?</p> */}
				<p></p>
				<p className="cursor-pointer" onClick={() => navigate("/login")}>
					Are You An Existing Member?
				</p>
			</div>
			<motion.button
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="bg-black text-white font-light px-8 py-2 mt-4"
			>
				Sign Up
			</motion.button>
		</form>
	);
}
