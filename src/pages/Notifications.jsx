import { useContext, useState } from "react";
import { AnimalContext } from "../context/AnimalContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Notifications() {
	const { apiLink } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");

	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmitHandler = async (data) => {
		try {
			setIsSubmitting(true);
			const formData = new FormData();
			formData.append("user_id", uid);
			formData.append("title", data.title);
			formData.append("body", data.body);

			const response = await fetch(`${apiLink}/send-notification/`, {
				method: "POST",
				body: formData,
			});
			const result = await response;
			// console.log(result);
			if (response.ok) {
				toast.success("Notifications sent successfully");
				reset();
			} else {
				toast.error(result.message || "Failed to sent notification");
			}
		} catch (error) {
			console.error("Error posting advertisement", error);
			toast.error("An error occurred while posting the advertisement");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-orange-500"
			>
				<div className="inline-flex items-center gap-2 mb-2 mt-10">
					<p className="prata-regular text-3xl">Push Notification</p>
					<hr className="border-none h-[1.5px] w-8 bg-orange-800" />
				</div>
				<input
					type="text"
					className={`w-full px-3 py-2 border ${
						errors.title ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Title"
					{...register("title", { required: "Title is required" })}
				/>
				{errors.title && (
					<p className="text-red-500 text-sm self-start">
						{errors.title.message}
					</p>
				)}
				<textarea
					className={`w-full px-3 py-2 border ${
						errors.body ? "border-red-500" : "border-gray-800"
					}`}
					placeholder="Body"
					rows={3}
					{...register("body", { required: "Body is required" })}
				/>
				{errors.body && (
					<p className="text-red-500 text-sm self-start">
						{errors.body.message}
					</p>
				)}
				{/* <input
					type="text"
					className="w-full px-3 py-2 border border-gray-800"
					placeholder="Body"
				/> */}
				<button
					className="bg-black text-white font-light px-8 py-2 mt-4"
					type="submit"
				>
					{isSubmitting ? "Posting..." : "Notify"}
				</button>
			</form>
		</>
	);
}
