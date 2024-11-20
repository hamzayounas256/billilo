// import Title from "../components/Title";
// import { useForm } from "react-hook-form";

// export default function LostAndFoundPet() {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 		reset,
// 	} = useForm();

// 	const onSubmitHandler = async (data) => {};

// 	return (
// 		<div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
// 			{/* -------------Left Side---------------- */}
// 			<form
// 				onSubmit={handleSubmit(onSubmitHandler)}
// 				className="flex flex-col gap-4 w-full sm:max-w-[450px]"
// 			>
// 				<div className="text-xl text-center sm:text-2xl">
// 					<Title text1={"POST YOUR"} text2={"PET"} />
// 				</div>

// 				<input
// 					className={`w-full px-3 py-2 border ${
// 						errors.name ? "border-red-500" : "border-gray-800"
// 					}`}
// 					type="text"
// 					placeholder="Title"
// 					{...register("name", { required: "Title is required" })}
// 				/>
// 				<input
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					type="text"
// 					placeholder="Category"
// 				/>
// 				<div className="flex gap-3">
// 					<input
// 						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 						type="text"
// 						placeholder="Breed"
// 					/>
// 					<input
// 						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 						type="text"
// 						placeholder="State"
// 					/>
// 				</div>
// 				<div className="flex gap-3">
// 					<input
// 						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 						type="number"
// 						placeholder="Age (in years)"
// 					/>
// 					<input
// 						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 						type="text"
// 						placeholder="Sex"
// 					/>
// 				</div>
// 				<input
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					type="number"
// 					placeholder="Price"
// 				/>
// 				<textarea
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					rows={3}
// 					placeholder="Description"
// 				/>
// 				<input
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					type="text"
// 					placeholder="Nearest Place"
// 				/>
// 				<input
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					type="text"
// 					placeholder="Address"
// 				/>
// 				<input
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					type="text"
// 					placeholder="Phone No"
// 				/>
// 				<input
// 					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
// 					type="file"
// 					multiple="multiple"
// 					placeholder=""
// 				/>
// 				<input
// 					className="border border-gray-300 bg-orange-500 rounded py-1.5 px-3.5 w-full"
// 					type="button"
// 					value="Submit"
// 				/>
// 			</form>
// 		</div>
// 	);
// }

import Title from "../components/Title";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LostAndFoundPet() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmitHandler = async (data) => {
		try {
			// Prepare form data
			const formData = new FormData();
			for (const key in data) {
				if (key === "images") {
					Array.from(data[key]).forEach((file) =>
						formData.append("images", file)
					);
				} else {
					formData.append(key, data[key]);
				}
			}

			const response = await fetch(
				"https://petapp1503.pythonanywhere.com/petapp/add-pet/",
				{
					method: "POST",
					body: formData,
				}
			);

			if (response.ok) {
				toast.success("Pet posted successfully!");
				reset();
			} else {
				toast.error("Failed to post pet. Please try again.");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again later.");
		}
	};

	const showErrors = () => {
		Object.keys(errors).forEach((field) => {
			toast.error(errors[field].message);
		});
	};

	return (
		<div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
			{/* Toast Container */}
			<ToastContainer />

			{/* Form */}
			<form
				onSubmit={handleSubmit(onSubmitHandler, showErrors)}
				className="flex flex-col gap-4 w-full sm:max-w-[450px]"
			>
				<div className="text-xl text-center sm:text-2xl">
					<Title text1={"POST YOUR"} text2={"PET"} />
				</div>

				{/* Name */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.name ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="Pet Name"
					{...register("name", { required: "Pet Name is required" })}
				/>

				{/* Category ID */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.categ_id ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="Category ID"
					{...register("categ_id", { required: "Category ID is required" })}
				/>

				{/* User ID */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.user_id ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="User ID"
					{...register("user_id", { required: "User ID is required" })}
				/>

				{/* Breed */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.breed ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="Breed"
					{...register("breed", { required: "Breed is required" })}
				/>

				{/* Sex */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.sex ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="Sex"
					{...register("sex", { required: "Sex is required" })}
				/>

				{/* Age */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.age ? "border-red-500" : "border-gray-800"
					}`}
					type="number"
					placeholder="Age (in years)"
					{...register("age", { required: "Age is required" })}
				/>

				{/* Price */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.price ? "border-red-500" : "border-gray-800"
					}`}
					type="number"
					placeholder="Price"
					{...register("price", { required: "Price is required" })}
				/>

				{/* Location */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.location ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="Location"
					{...register("location", { required: "Location is required" })}
				/>

				{/* Address */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.address ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="Address"
					{...register("address", { required: "Address is required" })}
				/>

				{/* WhatsApp Number */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.whatsapp_no ? "border-red-500" : "border-gray-800"
					}`}
					type="text"
					placeholder="WhatsApp Number"
					{...register("whatsapp_no", {
						required: "WhatsApp Number is required",
					})}
				/>

				{/* Description */}
				<textarea
					className={`w-full px-3 py-2 border ${
						errors.description ? "border-red-500" : "border-gray-800"
					}`}
					rows={3}
					placeholder="Description"
					{...register("description", { required: "Description is required" })}
				/>

				{/* Images */}
				<input
					className={`w-full px-3 py-2 border ${
						errors.images ? "border-red-500" : "border-gray-800"
					}`}
					type="file"
					multiple
					{...register("images", { required: "Images are required" })}
				/>

				{/* Submit Button */}
				<button
					type="submit"
					className="border border-gray-300 bg-orange-500 rounded py-1.5 px-3.5 w-full text-white"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
