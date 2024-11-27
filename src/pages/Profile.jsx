import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Profile() {
	const user = JSON.parse(localStorage.getItem("user")) || {};
	const {
		id: userId,
		first_name,
		last_name,
		email,
		country,
		phone_no,
		image,
	} = user;

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm({
		defaultValues: {
			first_name: first_name || "",
			last_name: last_name || "",
			email: email || "",
			country: country || "",
			phone_no: phone_no || "",
			password: "",
			confirm_password: "",
		},
	});

	const password = watch("password");

	useEffect(() => {
		reset({
			first_name: first_name || "",
			last_name: last_name || "",
			email: email || "",
			country: country || "",
			phone_no: phone_no || "",
			password: "",
			confirm_password: "",
		});
	}, [reset, first_name, last_name, email, country, phone_no]);

	const onSubmitHandler = async (data) => {
		// Check for validation errors
		if (Object.keys(errors).length > 0) {
			toast.error("Please fill all required fields correctly!");
			return;
		}

		// Ensure user_id is available
		if (!userId) {
			toast.error("User ID is missing.");
			return;
		}

		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("first_name", data.first_name);
			formData.append("last_name", data.last_name);
			formData.append("email", data.email);
			formData.append("country", data.country);
			formData.append("phone_no", data.phone_no);
			if (data.profile_img && data.profile_img[0]) {
				formData.append("profile_img", data.profile_img[0]);
			}
			if (data.password) {
				formData.append("password", data.password);
			}
			formData.append("user_id", userId); // Ensure the backend expects 'user_id'

			const response = await axios.post(
				"https://petapp1503.pythonanywhere.com/petapp/update-user/",
				formData
			);

			if (response.status === 200) {
				toast.success("Profile updated successfully!");
				localStorage.setItem(
					"user",
					JSON.stringify({
						...user,
						...data,
						image: response.data.profile_img,
					})
				);
				reset({
					...data,
					password: "",
					confirm_password: "",
				});
			} else {
				toast.error(response.data.message || "Update failed");
			}
		} catch (error) {
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.error(error.response.data);
				toast.error(error.response.data.message || "An error occurred.");
			} else if (error.request) {
				// The request was made but no response was received
				console.error(error.request);
				toast.error("No response from the server.");
			} else {
				// Something happened in setting up the request that triggered an Error
				console.error(error.message);
				toast.error("An error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className="flex flex-col items-center w-[90%] sm:max-w-lg mx-auto my-6 gap-4 text-orange-500"
		>
			{image && (
				<motion.img
					variants={fadeIn("up", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					src={image}
					alt="Profile"
					className="w-20 h-20 rounded-full mt-4 object-cover"
				/>
			)}

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

			{/* Phone no and Country */}
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
					{...register("phone_no", { required: "Phone Number is required" })}
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
						validate: (value) => value === password || "Passwords do not match",
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
			<motion.div
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="w-full"
			>
				<input
					type="file"
					accept="image/*"
					className="w-full px-3 py-2 border border-gray-800"
					{...register("profile_img")}
				/>
			</motion.div>

			{/* Submit Button */}
			<motion.button
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				type="submit"
				className="w-full px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
				disabled={loading}
			>
				{loading ? "Updating..." : "Update Profile"}
			</motion.button>
		</form>
	);
}
