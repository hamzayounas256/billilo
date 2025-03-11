import { useContext, useEffect, useState } from "react";
import { AnimalContext } from "../context/AnimalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export default function FindAdvertisement() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");
	const [ads, setAds] = useState([]);
	const [loading, setLoading] = useState(true);

	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedAd, setSelectedAd] = useState(null);

	// React Hook Form
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const fetchAdvertisement = async () => {
		setLoading(true);
		try {
			const response = await axios.get(apiLink + "/get-ad/", {
				params: {
					user_id: uid,
				},
			});
			if (response.status === 200) {
				setAds(response.data.data);
				// console.log(response.data.data);
			} else {
				toast.error(response.data.message || "Failed to fetch advertisements");
			}
		} catch (error) {
			toast.error("API Error: " + error.message);
			console.error("API Error", error.message);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			const isConfirmed = window.confirm(
				"Are you sure you want to delete this ad?"
			);
			if (!isConfirmed) return;

			const response = await axios.post(
				apiLink + "/delete-ad/",
				new URLSearchParams({
					user_id: uid,
					ad_id: id,
				}),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);
			console.log(response);

			if (response.data.success) {
				setAds(ads.filter((ad) => ad.id !== id));
				toast.success("Deleted Successfully");
			} else {
				toast.error("Deletion failed");
			}
		} catch (error) {
			console.error("Error Deleting Advertisement ", error);
			toast.error("An error occurred during deletion");
		}
	};

	// Function to handle advertisement update
	const handleUpdate = async (data) => {
		try {
			// Create FormData object instead of URLSearchParams for file uploads
			const formData = new FormData();
			formData.append("user_id", uid);
			formData.append("title", data.title);
			formData.append("desc", data.desc);
			formData.append("ad_id", selectedAd.id);

			// If there are images to upload, append them
			if (data.images && data.images.length > 0) {
				Array.from(data.images).forEach((file) => {
					formData.append("images", file);
				});
			}

			const response = await axios.post(apiLink + "/update-ad/", formData, {
				headers: {
					// Change content type to multipart/form-data - let axios set this automatically
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.data.success) {
				// Update the ads list
				fetchAdvertisement(); // Refresh the data instead of manually updating
				setShowEditModal(false);
				reset();
				toast.success("Updated Successfully");
			} else {
				toast.error("Update failed");
			}
		} catch (error) {
			console.error("Error updating advertisement:", error);
			toast.error("An error occurred during update");
		}
	};

	// Set default values for the form when an ad is selected
	useEffect(() => {
		if (selectedAd) {
			reset({
				title: selectedAd.title,
				desc: selectedAd.desc,
			});
		}
	}, [selectedAd, reset]);

	useEffect(() => {
		fetchAdvertisement();
	}, []);

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Floating Add Button */}
			<div className="fixed top-28 right-5 sm:top-28 sm:right-10 z-10">
				<button
					className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-orange-700 transition"
					onClick={() => navigate("/postadvertisment")}
				>
					<span className="text-2xl">+</span>
				</button>
			</div>
			<h1 className="text-2xl font-bold mb-6">Find Advertisements</h1>

			{/* Loading state */}
			{loading && (
				<div className="flex justify-center items-center h-40">
					<p className="text-gray-500">Loading advertisements...</p>
				</div>
			)}

			{/* Empty state */}
			{!loading && ads.length === 0 && (
				<div className="text-center py-10">
					<p className="text-gray-600 mb-4">No advertisements found</p>
					<button
						className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => navigate("/postadvertisment")}
					>
						Post New Advertisement
					</button>
				</div>
			)}

			{/* Advertisement cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{ads.map((ad, index) => (
					<div
						key={ad.id || index}
						className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
					>
						{/* Ad image */}
						<div className="w-full h-48 bg-gray-200 overflow-hidden">
							{ad && ad.images && ad.images.length > 0 ? (
								<img
									src={ad.images[0]}
									alt="Advertisement"
									className="w-full h-full object-cover"
									onError={(e) => {
										e.target.onerror = null;
										e.target.src =
											"https://via.placeholder.com/300x200?text=No+Image";
									}}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-gray-100">
									<span className="text-gray-400">No image available</span>
								</div>
							)}
						</div>

						{/* Ad content */}
						<div className="p-4">
							<h2 className="text-xl font-semibold mb-2 text-gray-800">
								{ad.title}
							</h2>
							<p className="text-gray-600 text-sm mb-4 line-clamp-2">
								{ad.desc}
							</p>

							<div className="flex justify-between items-center">
								<button
									className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition"
									onClick={() => {
										setSelectedAd(ad);
										setShowEditModal(true);
									}}
								>
									Edit
								</button>
								<button
									className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded transition"
									onClick={() => handleDelete(ad.id)}
								>
									Delete
								</button>
								<div className="text-xs text-gray-500 text-end">
									{ad.created_at}
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Edit Modal */}
			{showEditModal && selectedAd && (
				<div
					className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
					style={{ zIndex: 1000 }}
				>
					<div
						className="bg-white p-6 rounded-lg w-full lg:w-2/3"
						style={{ zIndex: 1001 }}
					>
						<h2 className="flex justify-center text-2xl font-bold mb-4 text-orange-400">
							Edit Advertisement
						</h2>
						<form
							onSubmit={handleSubmit(handleUpdate)}
							encType="multipart/form-data"
						>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="title"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Title:
								</label>
								<input
									type="text"
									id="title"
									{...register("title", {
										required: "Title is required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
								/>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="desc"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Description:
								</label>
								<textarea
									id="desc"
									{...register("desc", {
										required: "Description is required",
									})}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
									rows={4}
								></textarea>
							</div>
							<div className="flex flex-col lg:flex-row items-center mb-2">
								<label
									htmlFor="images"
									className="w-full lg:w-1/4 block text-gray-700"
								>
									Images:
								</label>
								<input
									type="file"
									id="images"
									{...register("images")}
									className="w-full lg:w-3/4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-600"
									multiple
								/>
							</div>
							{/* {selectedAd.images && selectedAd.images.length > 0 && (
								<div className="flex flex-col lg:flex-row items-start mb-4">
									<div className="w-full lg:w-1/4 block text-gray-700">
										Current Images:
									</div>
									<div className="w-full lg:w-3/4 flex flex-wrap gap-2">
										{selectedAd.images.map((img, idx) => (
											<div key={idx} className="w-16 h-16 relative">
												<img
													src={img}
													alt={`Current image ${idx + 1}`}
													className="w-full h-full object-cover border border-gray-300 rounded"
												/>
											</div>
										))}
									</div>
								</div>
							)} */}
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
