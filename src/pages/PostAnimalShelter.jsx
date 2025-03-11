import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { AnimalContext } from "../context/AnimalContext";

export default function PostAnimalShelter() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");
	const personName = localStorage.getItem("user_name");

	const [showMap, setShowMap] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [isLocationSelected, setIsLocationSelected] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();

	// Function to handle form submission
	const onSubmitHandler = async (data) => {
		try {
			const requiredFields = [
				"house_name",
				"capacity",
				"current_occupancy",
				"owner_name",
				"email",
				"address",
				"location",
				"phone_no",
			];
			for (const field of requiredFields) {
				if (!data[field]) {
					toast.error("You must fill all fields!");
					return;
				}
			}

			const formData = new FormData();
			formData.append("house_name", data.house_name);
			formData.append("capacity", data.capacity);
			formData.append("current_occupancy", data.current_occupancy);
			formData.append("owner_name", data.owner_name);
			formData.append("phone_no", data.phone_no);
			formData.append("email", data.email);
			formData.append("address", data.address);
			formData.append("location", data.location);
			formData.append("user_id", uid);

			const response = await fetch(apiLink + "/add-animal-shellter/", {
				method: "POST",
				body: formData,
			});

			const result = await response.json(); // Properly parse JSON before accessing properties

			if (response.ok) {
				toast.success(
					result.message || "Pet information submitted successfully!"
				);
				reset();
				navigate("/findanimalshelter");
			} else {
				toast.error(
					result.message ||
						"Failed to submit pet information. Please try again."
				);
			}
		} catch (error) {
			console.error("Error submitting the form:", error);
			toast.error("An unexpected error occurred. Please try again later.");
		}
	};

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
					<Title text1={"POST YOUR"} text2={"ANIMAL SHELTER"} />
				</div>

				<input
					className="w-full px-3 py-2 border border-gray-300"
					type="text"
					placeholder="House Name"
					{...register("house_name", { required: "House name is required" })}
				/>

				<div className="flex gap-3">
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="number"
						min={0}
						placeholder="Capacity"
						{...register("capacity", { required: "Capacity is required" })}
					/>
					<input
						className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
						type="number"
						min={0}
						placeholder="Current Occupancy"
						{...register("current_occupancy", {
							required: "Current Occupancy is Required",
						})}
					/>
				</div>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Owner Name"
					{...register("owner_name", { required: "Owner Name is required" })}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Email Address"
					{...register("email", { required: "Email Address is required" })}
				/>
				<input
					className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
					type="text"
					placeholder="Phone No"
					{...register("phone_no", { required: "Phone number is required" })}
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
					{...register("address", { required: "Address is Required" })}
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
