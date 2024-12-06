import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AnimalContext } from "../context/AnimalContext";

export default function Profile() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const user = JSON.parse(localStorage.getItem("user")) || {};
	const {
		id: userId,
		first_name,
		last_name,
		email,
		country,
		phone_no,
		image,
		password: upassword,
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
			formData.append("user_id", userId);
			formData.append("password", data.password);
			formData.append("confirm_password", data.confirm_password);
			if (data.profile_img?.[0]) {
				formData.append("profile_img", data.profile_img[0]);
			}

			const response = await axios.post(apiLink + "/update-user/", formData);

			if (response.status === 200) {
				toast.success("Profile updated successfully!");
				const updatedUser = {
					...user,
					first_name: data.first_name,
					last_name: data.last_name,
					email: data.email,
					country: data.country,
					phone_no: data.phone_no,
				};

				if (data.profile_img && data.profile_img[0]) {
					updatedUser.image = response.data.profile_img || user.image;
				}

				localStorage.setItem("user", JSON.stringify(updatedUser));
				reset({
					confirm_password: "",
				});
				navigate("/");
			} else {
				toast.error(response.data.message || "Update failed");
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "An error occurred.");
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

			<div className="w-full flex gap-2">
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

			<input
				type="email"
				className={`w-full px-3 py-2 border ${
					errors.email ? "border-red-500" : "border-gray-800"
				}`}
				placeholder="Email Address"
				{...register("email", { required: "Email is required" })}
			/>

			<div className="w-full flex gap-2">
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
			</div>

			<div className="w-full relative">
				<input
					type={showPassword ? "text" : "password"}
					className={`w-full px-3 py-2 border ${
						errors.password ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="New Password"
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters long",
						},
					})}
				/>
				<span
					className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
					onClick={() => setShowPassword((prev) => !prev)}
				>
					{showPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</div>

			<div className="w-full relative">
				<input
					type={showConfirmPassword ? "text" : "password"}
					className={`w-full px-3 py-2 border ${
						errors.confirm_password ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Confirm Password"
					{...register("confirm_password", {
						required: "Confirm Password is required",
						validate: (value) => value === password || "Passwords do not match",
					})}
				/>
				<span
					className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
					onClick={() => setShowConfirmPassword((prev) => !prev)}
				>
					{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
				</span>
			</div>

			<div className="w-full">
				<input
					type="file"
					className="w-full px-3 py-2 border border-gray-800"
					{...register("profile_img")}
				/>
			</div>

			<button
				type="submit"
				className="w-full px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
				disabled={loading}
			>
				{loading ? "Updating..." : "Update Profile"}
			</button>
		</form>
	);
}
