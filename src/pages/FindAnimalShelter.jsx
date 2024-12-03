import { useState, useEffect, useContext } from "react";
import {
	MapContainer,
	TileLayer,
	Marker as LeafletMarker,
	Popup,
} from "react-leaflet";
import axios from "axios";
import Title from "../components/Title";
import { AnimalContext } from "../context/AnimalContext";
import { toast } from "react-toastify";
import {
	LoadScript,
	GoogleMap,
	Marker as GoogleMarker,
} from "@react-google-maps/api";
import { useForm } from "react-hook-form";

export default function FindAnimalShelter() {
	const [shelters, setShelters] = useState([]);
	const { apiLink, navigate } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");
	const type = localStorage.getItem("type");

	// State for modal and form data
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedShelter, setSelectedShelter] = useState(null);

	// Map state variables
	const [showMap, setShowMap] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState({
		lat: 33.7169,
		lng: 73.0812,
	});
	const [isLocationSelected, setIsLocationSelected] = useState(false);

	// React Hook Form
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		// Fetch shelters data from API
		axios
			.get(apiLink + "/get-animal-shellter/", { params: { user_id: uid } })
			.then((response) => {
				if (response.data.success) {
					setShelters(response.data.data);
				}
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	// Function to handle shelter deletion
	const handleDelete = async (shelterId) => {
		try {
			const isConfirmed = window.confirm(
				"Are you sure you want to delete this shelter?"
			);
			if (!isConfirmed) return;

			const response = await axios.post(
				apiLink + "/delete-animal-sheltter/",
				new URLSearchParams({
					user_id: uid,
					animal_shellter_id: shelterId,
				}),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);

			if (response.data.success) {
				setShelters(shelters.filter((shelter) => shelter.id !== shelterId));
				toast.success("Deleted Successfully");
			} else {
				toast.error("Deletion failed");
			}
		} catch (error) {
			console.error("Error deleting shelter:", error);
			toast.error("An error occurred during deletion");
		}
	};

	// Function to handle shelter update
	const handleUpdate = async (data) => {
		try {
			const response = await axios.post(
				apiLink + "/update-animal-shellter/",
				new URLSearchParams({
					user_id: uid,
					house_name: data.house_name,
					capacity: data.capacity,
					current_occupancy: data.current_occupancy,
					address: data.address,
					location: data.location,
					email: data.email,
					owner_name: data.owner_name,
					phone_no: data.phone_no,
					animal_shellter_id: selectedShelter.id,
				}),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);

			if (response.data.success) {
				// Update the shelters list
				const updatedShelters = shelters.map((shelter) =>
					shelter.id === selectedShelter.id ? response.data.data : shelter
				);
				setShelters(updatedShelters);
				setShowEditModal(false);
				reset();
				navigate("/hero");
				toast.success("Updated Successfully");
			} else {
				toast.error("Update failed");
			}
		} catch (error) {
			console.error("Error updating shelter:", error);
			toast.error("An error occurred during update");
		}
	};

	// Handle map click to select location
	const handleMapClick = (event) => {
		if (event.latLng) {
			const location = {
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
			};
			setSelectedLocation(location);
			setValue("location", `${location.lat}, ${location.lng}`);
			setIsLocationSelected(true);
			setShowMap(false);
		} else {
			console.error("No LatLng data available in map click event.");
		}
	};

	// Handle location input focus
	const handleLocationFocus = () => {
		if (!isLocationSelected) {
			// Optionally get user's geolocation here
		}
		setShowMap(true);
	};

	// Set initial location when modal opens
	useEffect(() => {
		if (selectedShelter && selectedShelter.location) {
			const [lat, lng] = selectedShelter.location.split(",").map(Number);
			setSelectedLocation({ lat, lng });
			setValue("location", selectedShelter.location);
		} else {
			setSelectedLocation({ lat: 33.7169, lng: 73.0812 });
			setValue("location", "33.7169,73.0812");
		}
	}, [selectedShelter, setValue]);

	// Set default values for the form when a shelter is selected
	useEffect(() => {
		if (selectedShelter) {
			reset({
				house_name: selectedShelter.house_name,
				capacity: selectedShelter.capacity,
				current_occupancy: selectedShelter.current_occupancy,
				address: selectedShelter.address,
				location: selectedShelter.location,
				email: selectedShelter.email,
				owner_name: selectedShelter.owner_name,
				phone_no: selectedShelter.phone_no,
			});
		}
	}, [selectedShelter, reset]);

	return (
		<div className="container mx-auto">
			<div className="text-center text-2xl pt-10 border-t">
				<Title text1={"ANIMAL"} text2={"SHELTER"} />
			</div>

			{shelters.length > 0 ? (
				shelters.map((shelter) => {
					let latitude = 0;
					let longitude = 0;
					if (shelter.location) {
						const locationData = shelter.location.split(",");
						if (locationData.length === 2) {
							latitude = parseFloat(locationData[0].trim());
							longitude = parseFloat(locationData[1].trim());
						}
					}

					return (
						<div
							key={shelter.id}
							className="flex flex-col sm:flex-row border px-2 my-5 border-grey-400"
						>
							{/* + Button */}
							{type === "Admin" && (
								<div className="absolute top-28 right-5 sm:top-28 sm:right-10 -z-1">
									<button
										className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-orange-700 transition"
										onClick={() => navigate("/postanimalshelter")}
									>
										+
									</button>
								</div>
							)}
							{/* Left Section */}
							<div className="w-full sm:w-1/2 flex items-center py-10 sm:py-0">
								<div className="lg:ms-2 text-[#414141]">
									<h1 className="prata-regular text-xl sm:py-3 lg:text-2xl leading-relaxed text-orange-500">
										{shelter.house_name}
									</h1>
									<div className="flex items-center gap-2 my-5">
										<p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
										<p className="font-medium text-sm md:text-base">
											<b>Address: </b>
											{shelter.address}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<p className="font-semibold text-sm md:text-base">
											{shelter.phone_no}
										</p>
										<p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
									</div>
									<p className="text-sm md:text-base mt-3">
										<b>Owner: </b> {shelter.owner_name}
									</p>
									<p className="text-sm md:text-base">
										<b>Email: </b> {shelter.email}
									</p>
									<p className="text-sm md:text-base">
										<b>Capacity: </b> {shelter.capacity}
									</p>
									<p className="text-sm md:text-base">
										<b>Current Occupancy: </b> {shelter.current_occupancy}
									</p>
									{type === "Admin" ? (
										<div className="flex my-2 gap-2">
											{/* Delete Button */}
											<button
												className="bg-orange-400 rounded-lg px-4 py-2"
												onClick={() => handleDelete(shelter.id)}
											>
												Delete
											</button>
											{/* Edit Button */}
											<button
												className="bg-orange-400 rounded-lg px-4 py-2"
												onClick={() => {
													setSelectedShelter({ ...shelter });
													setShowEditModal(true);
												}}
											>
												Edit
											</button>
										</div>
									) : (
										""
									)}
								</div>
							</div>

							{/* Right Section (OpenStreetMap) */}
							<div className="w-full sm:w-1/2 h-[45vh]">
								<MapContainer
									center={[latitude, longitude]}
									zoom={13}
									style={{ height: "100%", width: "100%", zIndex: 1 }}
								>
									<TileLayer
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									/>
									{latitude && longitude && (
										<LeafletMarker position={[latitude, longitude]}>
											<Popup>
												{shelter.house_name} <br /> {shelter.address}
											</Popup>
										</LeafletMarker>
									)}
								</MapContainer>
							</div>
						</div>
					);
				})
			) : (
				<p className="text-center py-10">Loading shelters...</p>
			)}

			{/* Edit Modal */}
			{showEditModal && selectedShelter && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
					style={{ zIndex: 1000 }}
				>
					<div
						className="bg-white p-6 rounded-lg w-full lg:w-2/3"
						style={{ zIndex: 1001 }}
					>
						<h2 className="flex justify-center text-2xl font-bold mb-4 text-orange-400">
							Edit Shelter
						</h2>
						<form onSubmit={handleSubmit(handleUpdate)}>
							<div className="flex flex-col lg:flex-row items-center items-center mb-2">
								<label
									htmlFor="house_name"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									House Name:
								</label>
								<input
									type="text"
									id="house_name"
									{...register("house_name", {
										required: "House name is required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="capacity"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Capacity:
								</label>
								<input
									type="number"
									id="capacity"
									{...register("capacity", {
										required: "Capacity is required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="current_occupancy"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Current Occupancy:
								</label>
								<input
									type="number"
									id="current_occupancy"
									{...register("current_occupancy", {
										required: "Current Occupancy is Required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="address"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Address:
								</label>
								<input
									type="text"
									id="address"
									{...register("address", { required: "Address is Required" })}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="location"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Location:
								</label>
								<input
									type="text"
									id="location"
									readOnly
									onFocus={handleLocationFocus}
									{...register("location", {
										required: "Location is Required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							{showMap && (
								<div>
									<LoadScript googleMapsApiKey="AIzaSyCvIBpb1jSKbolAv1oaLE90ctMiL8pTqIg">
										<GoogleMap
											key={
												selectedLocation
													? `${selectedLocation.lat},${selectedLocation.lng}`
													: "default"
											}
											mapContainerStyle={{ width: "100%", height: "400px" }}
											center={selectedLocation}
											zoom={13}
											onClick={handleMapClick}
										>
											{selectedLocation && (
												<GoogleMarker position={selectedLocation} />
											)}
										</GoogleMap>
									</LoadScript>
								</div>
							)}
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="email"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Email:
								</label>
								<input
									type="email"
									id="email"
									{...register("email", { required: "Email is required" })}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="owner_name"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Owner Name:
								</label>
								<input
									type="text"
									id="owner_name"
									{...register("owner_name", {
										required: "Owner Name is required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="phone_no"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Phone Number:
								</label>
								<input
									type="tel"
									id="phone_no"
									{...register("phone_no", {
										required: "Phone number is required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex justify-end">
								<button
									type="button"
									className="bg-red-500 text-white px-4 py-2 rounded mr-2"
									onClick={() => setShowEditModal(false)}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="bg-blue-500 text-white px-4 py-2 rounded"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
