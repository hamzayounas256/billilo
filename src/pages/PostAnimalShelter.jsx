import Title from "../components/Title";
import { useForm } from "react-hook-form";

export default function PostAnimalShelter() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmitHandler = async (data) => {};
	return (
		<div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
			{/* -------------Left Side---------------- */}
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="flex flex-col gap-4 w-full sm:max-w-[450px]"
			>
				<div className="text-xl text-center sm:text-2xl">
					<Title text1={"ANIMAL"} text2={"SHELTER"} />
				</div>

				<input
					className="w-full px-3 py-2 border border-gray-300"
					type="text"
					placeholder="Title"
					{...register("name", { required: "Title is required" })}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Category"
				/>
				<div className="flex gap-3">
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="text"
						placeholder="Breed"
					/>
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="text"
						placeholder="State"
					/>
				</div>
				<div className="flex gap-3">
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="number"
						placeholder="Age (in years)"
					/>
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="text"
						placeholder="Sex"
					/>
				</div>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="number"
					placeholder="Price"
				/>
				<textarea
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					rows={3}
					placeholder="Description"
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Nearest Place"
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Address"
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Phone No"
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="file"
					multiple="multiple"
					placeholder=""
				/>
				<input
					className="border border-gray-300 bg-orange-500 rounded py-1.5 px-3.5 w-full"
					type="button"
					value="Submit"
				/>
			</form>
		</div>
	);
}
