import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";
import ProductItemAdopt from "../components/ProductItemAdopt";
import { AnimalContext } from "../context/AnimalContext";

export default function FindAdoptPet() {
	const { apiLink } = useContext(AnimalContext);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [search, setSearch] = useState("");
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
			const response = await axios.get(apiLink + "/dashboard/", {
				params: {
					category: selectedCategory,
					user_id: uid,
					start_price: priceRange.start,
					end_price: priceRange.end,
					start_date: startDate,
					end_date: endDate,
					name: search,
					status: "Adopt",
				},
			});

			if (response.data.success) {
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
	}, [priceRange, selectedCategory, startDate, endDate, search]);

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
		<div className="container mx-auto flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
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

				{/* Search Filter */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? "" : "hidden"
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">BY NAME</p>
					<div className="flex flex-col gap-4 text-sm font-light">
						<input
							className="w-3/4 mx-auto border border-gray-400"
							type="text"
							value={search}
							placeholder="Search here..."
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				{/* Price Filter */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? "" : "hidden"
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">BY PRICE</p>
					<div className="flex flex-col gap-4 text-sm font-light">
						<input
							className="w-3/4 mx-auto slider"
							type="range"
							min="0"
							max="50000"
							value={sliderValue}
							onChange={handleRangeChange}
						/>
						<div className="flex justify-between items-center w-3/4 mx-auto">
							<div className="flex flex-col items-center">
								<label className="text-xs text-orange-500">Start Price</label>
								<input
									className="w-20 border px-2 py-1 text-center"
									type="number"
									value={priceRange.start}
									readOnly
								/>
							</div>
							<div className="flex flex-col items-center">
								<label className="text-xs text-orange-500">End Price</label>
								<input
									className="w-20 border px-2 py-1 text-center"
									type="number"
									value={priceRange.end}
									readOnly
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Date Filter */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? "" : "hidden"
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">BY DATES</p>
					<div className="flex flex-col gap-4 text-sm font-light">
						<div className="flex flex-col items-center w-full mx-auto">
							<div className="flex flex-col items-center">
								<label className="text-xs text-orange-500">Start Date</label>
								<input
									className="w-22 border py-1 text-center"
									type="date"
									value={startDate}
									onChange={handleStartDateChange}
								/>
							</div>
							<div className="flex flex-col items-center">
								<label className="text-xs text-orange-500">End Date</label>
								<input
									className="w-22 border py-1 text-center"
									type="date"
									value={endDate}
									onChange={handleEndDateChange}
								/>
							</div>
						</div>
					</div>
				</div>

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
					<Title text1={"ADOPT"} text2={"PET"} />
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
					{products.map((item) => (
						<ProductItemAdopt
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
