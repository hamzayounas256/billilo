import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function PostSellPet() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");
	// const personName = localStorage.getItem("user_name");
	// console.log(uid);

	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		try {
			const response = await axios.get(apiLink + "/get-category/");

			if (response.status === 200) {
				setCategories(response.data.data);
				// console.log(response.data.data);
			} else {
				console.error(response.data.message || "Failed to fetch categories");
			}
		} catch (err) {
			console.error("API Error:", err.message);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const {
		register,
		handleSubmit,
		// formState: { errors },
		reset,
		setValue,
	} = useForm();

	const onSubmitHandler = async (data) => {
		try {
			// Check if any required field is empty
			const requiredFields = [
				"name",
				"categ_id",
				"breed",
				"age",
				"sex",
				"address",
				"location",
				"whatsapp_no",
				"price",
				"images",
				"description",
			];
			for (const field of requiredFields) {
				if (!data[field]) {
					toast.error("You must fill all fields!");
					return;
				}
			}

			// Prepare the form data for the API
			const formData = new FormData();
			for (const file of data.images) {
				formData.append("images", file);
			}
			formData.append("name", data.name);
			formData.append("age", data.age);
			formData.append("breed", data.breed);
			// formData.append("color", data.color);
			// formData.append("identity_mark", data.identity_mark);
			formData.append("sex", data.sex);
			formData.append("status", "Sale");
			formData.append("categ_id", data.categ_id);
			// formData.append("person_name", personName);
			formData.append("address", data.address);
			formData.append("location", data.location);
			formData.append("whatsapp_no", data.whatsapp_no);
			formData.append("description", data.description);
			formData.append("price", data.price);
			formData.append("user_id", uid);

			// API Call
			const response = await fetch(apiLink + "/add-pet/", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				await response.json();
				toast.success(
					// response.data.message ||
					"Pet information submitted successfully!"
				);
				navigate("/findsellpet");
				reset();
			} else {
				toast.error(
					// response.data.message ||
					"Failed to submit pet information. Please try again."
				);
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			toast.error("An error occurred. Please try again.");
		}
	};

	const [showMap, setShowMap] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [isLocationSelected, setIsLocationSelected] = useState(false);

	// Function to get user's geolocation
	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setSelectedLocation({ lat: latitude, lng: longitude });
				},
				(error) => {
					console.error("Error getting location:", error);
					toast.error("Unable to retrieve your location.");
				}
			);
		} else {
			console.error("Geolocation is not supported by this browser.");
			toast.error("Geolocation is not supported by this browser.");
		}
	};

	// Combined handler for location input focus
	const handleLocationFocus = () => {
		if (!isLocationSelected) {
			getUserLocation();
		}
		setShowMap(true);
	};

	// Handle map click to select location
	const handleMapClick = (event) => {
		const location = {
			lat: event.latLng.lat(),
			lng: event.latLng.lng(),
		};
		setSelectedLocation(location);
		setValue("location", `${location.lat}, ${location.lng}`);
		setIsLocationSelected(true); // Add this line
		setShowMap(false);
		// console.log("Location selected:", location); // Debug log
	};

	// Map center based on selectedLocation or default Pakistan coordinates
	const center = selectedLocation || {
		lat: 33.7169, // Islamabad latitude
		lng: 73.0812, // Islamabad longitude
	};

	// Map container style
	const mapContainerStyle = {
		width: "100%",
		height: "400px",
	};

	return (
		<div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 px-2 sm:pt-14 min-h-[80vh] border-t">
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="flex flex-col gap-4 w-full sm:max-w-[450px]"
			>
				<div className="text-xl text-center sm:text-2xl">
					<Title text1={"POST YOUR"} text2={"SELL PET"} />
				</div>

				<input
					className="w-full px-3 py-2 border border-gray-300"
					type="text"
					placeholder="Title"
					autoComplete="off"
					{...register("name", { required: "Title is required" })}
				/>
				<select
					id="categ_id"
					className=" border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					{...register("categ_id", { required: "Category is required" })}
				>
					<option selected>Choose a Category</option>
					{categories.map((item, index) => (
						<option key={index} value={item.id}>
							{item.name}
						</option>
					))}
				</select>
				<div className="flex gap-3">
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="text"
						placeholder="Breed"
						autoComplete="off"
						{...register("breed", { required: "Breed is required" })}
					/>
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="text"
						placeholder="Price"
						autoComplete="off"
						{...register("price", { required: "Price is Required" })}
					/>
				</div>
				<div className="flex gap-3">
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="number"
						min="0"
						step="0.1"
						placeholder="Age (in years)"
						autoComplete="off"
						{...register("age", { required: "Age is required" })}
					/>
					<select
						id="sex"
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						{...register("sex", { required: "Sex is required" })}
					>
						<option value="" selected>
							Choose a Sex
						</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>
				</div>
				{/* <input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Identity Mark"
					{...register("identity_mark")}
				/> */}
				<textarea
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					rows={3}
					placeholder="Description"
					autoComplete="off"
					{...register("description", { required: "Description is Required" })}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Nearest Place"
					readOnly
					onFocus={handleLocationFocus}
					{...register("location", { required: "Location is Required" })}
				/>
				{showMap && (
					<div>
						<LoadScript googleMapsApiKey="AIzaSyCvIBpb1jSKbolAv1oaLE90ctMiL8pTqIg">
							<GoogleMap
								mapContainerStyle={mapContainerStyle}
								center={center}
								zoom={13}
								onClick={handleMapClick}
								key={JSON.stringify(center)} // Add this line
							>
								{selectedLocation && <Marker position={selectedLocation} />}
							</GoogleMap>
						</LoadScript>
					</div>
				)}
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Address"
					autoComplete="off"
					{...register("address", { required: "Address is Required" })}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Whatsapp Number"
					autoComplete="off"
					{...register("whatsapp_no", {
						required: "Whatsapp number is required",
					})}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="file"
					multiple
					{...register("images", { required: "Please upload images" })}
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
