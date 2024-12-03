import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";
import ProductItemFind from "../components/ProductItemFind";
import { AnimalContext } from "../context/AnimalContext";

export default function FindFoundPet() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [showFilter, setShowFilter] = useState(false);

	const [priceRange, setPriceRange] = useState({
		start: 0,
		end: 50000,
	});
	const [sliderValue, setSliderValue] = useState(25000); // Midpoint of range

	const [startDate, setStartDate] = useState(""); // Start Date for Filter
	const [endDate, setEndDate] = useState(""); // End Date for Filter

	const uid = localStorage.getItem("id");

	// Calculate default start and end dates
	useEffect(() => {
		const today = new Date();
		const firstDay = new Date(today.getFullYear(), today.getMonth(), 1); // 1st day of the month
		const formattedStartDate = firstDay.toISOString().split("T")[0]; // Format as YYYY-MM-DD
		const formattedEndDate = today.toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

		setStartDate(formattedStartDate);
		setEndDate(formattedEndDate);
	}, []);

	// Handle slider range change
	const handleRangeChange = (e) => {
		const value = Number(e.target.value);
		setPriceRange({ start: 0, end: value }); // Directly set the range
		setSliderValue(value);
		// console.log("Updated Range:", { start: 0, end: value }); // Debug log
	};

	// Handle date change
	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	// Fetch dashboard data
	const fetchDashboardData = async () => {
		try {
			// console.log("Fetching with Range:", priceRange, startDate, endDate); // Debug log
			const response = await axios.get(apiLink + "/find-lost-dashboard/", {
				params: {
					user_id: uid,
					status: "find",
					category: selectedCategory,
					// start_price: priceRange.start,
					// end_price: priceRange.end,
					// start_date: startDate,
					// end_date: endDate,
				},
			});

			if (response.data.success) {
				// console.log("Fetched Products:", response.data.data); // Debug log
				setProducts(response.data.data);
			} else {
				console.error("Error Fetching Products:", response.data.message);
			}
		} catch (err) {
			console.error("API Error:", err.message);
		}
	};

	useEffect(() => {
		fetchDashboardData(); // Trigger fetch on filter changes
	}, [selectedCategory]);

	// Fetch categories
	const fetchCategories = async () => {
		try {
			const response = await axios.get(apiLink + "/get-category/");

			if (response.status === 200) {
				setCategories(response.data.data);
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

	// Handle category selection
	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	return (
		<div className="container mx-auto px-2 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
			{/* + Button */}
			<div className="absolute top-28 right-5 sm:top-28 sm:right-10 -z-1">
				<button
					className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-orange-700 transition"
					onClick={() => navigate("/postfoundpet")}
				>
					+
				</button>
			</div>
			{/* Filter Section */}
			<div className="min-w-60">
				<p
					onClick={() => setShowFilter(!showFilter)}
					className="my-2 text-xl flex items-center cursor-pointer gap-2"
				>
					FILTERS
					<img
						className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
						src={assets.dropdown_icon}
						alt="Dropdown Icon"
					/>
				</p>

				{/* Category Filter */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? "" : "hidden"
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">BY CATEGORIES</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						<p className="flex gap-2">
							<input
								type="radio"
								name="category"
								value=""
								checked={selectedCategory === ""}
								onChange={handleCategoryChange}
							/>
							All
						</p>
						{categories.map((item) => (
							<p key={item.id} className="flex gap-2">
								<input
									type="radio"
									name="category"
									value={item.id}
									checked={selectedCategory === String(item.id)}
									onChange={handleCategoryChange}
								/>
								{item.name}
							</p>
						))}
					</div>
				</div>
			</div>

			{/* Products Section */}
			<div className="flex-1 md:mx-2">
				<div className="flex justify-center text-base sm:text-2xl mb-4">
					<Title text1={"FOUND"} text2={"PET"} />
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
					{products.map((item) => (
						<ProductItemFind
							key={item.id}
							id={item.id}
							image={item.images}
							name={item.name}
							category={item.category}
							breed={item.breed}
							location={item.location}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
