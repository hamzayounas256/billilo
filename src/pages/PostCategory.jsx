import { useContext } from "react";
import Title from "../components/Title";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AnimalContext } from "../context/AnimalContext";

export default function PostCategory() {
	const { apiLink, navigate } = useContext(AnimalContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	// Optimized function to handle form submission
	const onSubmitHandler = async (data) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("image", data.image[0]); // Ensure file is properly handled

		try {
			const response = await fetch(`${apiLink}/add-category/`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) throw new Error("Failed to submit");

			await response.json();
			toast.success("Information submitted successfully!");
			reset(); // Reset form only after success
			navigate("/allcategory");
		} catch (error) {
			console.error("Error submitting the form:", error);
			toast.error("An error occurred. Please try again.");
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 px-2 sm:pt-14 min-h-[80vh] border-t">
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="flex flex-col gap-4 w-full sm:max-w-[450px]"
			>
				<div className="text-xl text-center sm:text-2xl">
					<Title text1={"POST"} text2={"CATEGORY"} />
				</div>

				<input
					className="w-full px-3 py-2 border border-gray-300"
					type="text"
					placeholder="Title"
					{...register("name", { required: "Title is required" })}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="file"
					{...register("image", { required: "Please upload image" })}
				/>
				<button
					className="border border-gray-300 bg-orange-500 rounded py-1.5 px-3.5 w-full text-white"
					type="submit"
				>
					Submit
				</button>
			</form>
		</div>
	);
}
