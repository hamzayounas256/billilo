import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";

export default function Collection() {
	const [products, setProducts] = useState([]);
	// const [collection, setCollection] = useState([]);
	const [showFilter, setShowFilter] = useState(false);

	const [category, setCategory] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);

	const [values, setValues] = useState({
		start: 0,
		end: 20000,
	});

	const [sliderValue, setSliderValue] = useState(10000); // Initial range midpoint value

	const handleRangeChange = (e) => {
		const value = Number(e.target.value);
		setSliderValue(value);

		// Dynamically calculate start and end based on the slider's value
		setValues({
			start: value - 5000 < 0 ? 0 : value - 5000, // Start value (min 0)
			end: value + 5000 > 20000 ? 20000 : value + 5000, // End value (max 20000)
		});
	};

	const uid = localStorage.getItem("id");
	// console.log(uid);

	// API Call Function
	const fetchDashboardData = async () => {
		try {
			const response = await axios.get(
				"https://petapp1503.pythonanywhere.com/petapp/dashboard/",
				{
					params: {
						categories: selectedCategories.join(","),
						user_id: uid,
						start_price: values.start,
						end_price: values.end,
						start_date: "",
						end_date: "",
					},
				}
			);

			if (response.data.success) {
				// console.log(response);
				setProducts(response.data.data); // Save API data in state

				// toast.success("Data fetched successfully!");
			} else {
				// toast.error(response.data.message || "Failed to fetch data");
			}
		} catch (err) {
			console.error("API Error:", err);
			// setError(err.message);
			// toast.error("An error occurred while fetching data.");
		} finally {
			// setLoading(false); // Stop loading state
		}
	};
	useEffect(() => {
		// Call the API
		fetchDashboardData();
	}, []);

	const fetchCategory = async () => {
		try {
			const response = await axios.get(
				"https://petapp1503.pythonanywhere.com/petapp/get-category/"
			);
			// Check the response status
			if (response.status === 200) {
				// console.log("Category Fetched:", response.data.data); // Log the actual data
				setCategory(response.data.data);
			} else {
				console.error(response.data.message || "Failed to fetch data");
			}
		} catch (error) {
			// Log the error for debugging
			console.error("API ERROR:", error.message || error);
		}
	};

	useEffect(() => {
		fetchCategory();
	}, []);

	// Handle category selection
	const handleCategoryChange = (e) => {
		const value = e.target.value;
		setSelectedCategories(
			(prev) =>
				prev.includes(value)
					? prev.filter((item) => item !== value) // Remove if unchecked
					: [...prev, value] // Add if checked
		);
	};

	return (
		<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
			{/* Filter options */}
			<div className="min-w-60">
				<p
					onClick={() => setShowFilter(!showFilter)}
					className="my-2 text-xl flex items-center cursor-pointer gap-2"
				>
					FILTERS
					<img
						className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
						src={assets.dropdown_icon}
						alt=""
					/>
				</p>
				{/* Search bar */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? "" : "hidden"
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">Search Here</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						<p className="flex gap-4">
							<input
								className="w-3/4 px-3 py-2 border"
								type="text"
								placeholder="Search Here..."
							/>
							<button className="cursor-pointer w-3">
								<img src={assets.search_icon} alt="" />
							</button>
						</p>
					</div>
				</div>

				{/* Filter By Price */}
				<div
					className={`border border-gray-300 pl-5 py-3 mt-6 ${
						showFilter ? "" : "hidden"
					} sm:block`}
				>
					<p className="mb-3 text-sm font-medium">Filter By Price</p>
					<div className="flex flex-col gap-4 text-sm font-light">
						{/* Single Range Slider */}
						<input
							className="w-3/4 mx-auto slider"
							type="range"
							min="0"
							max="20000"
							value={sliderValue}
							onChange={handleRangeChange}
						/>

						{/* Display Start and End Values */}
						<div className="flex justify-between items-center w-3/4 mx-auto">
							<div className="flex flex-col items-center">
								<label className="text-xs text-orange-500">Start</label>
								<input
									className="w-20 border px-2 py-1 text-center"
									type="number"
									value={values.start}
									readOnly
								/>
							</div>
							<div className="flex flex-col items-center">
								<label className="text-xs text-orange-500">End</label>
								<input
									className="w-20 border px-2 py-1 text-center"
									type="number"
									value={values.end}
									readOnly
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
					<p className="mb-3 text-sm font-medium">CATEGORIES</p>
					<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
						{category.map((item, index) => (
							<p key={index} className="flex gap-2">
								<input
									className="w-3"
									type="checkbox"
									// value={"Men"}
									onChange={handleCategoryChange}
								/>
								{item.name}
							</p>
						))}
					</div>
				</div>
			</div>
			{/* Right Side */}
			<div className="flex-1">
				<div className="flex justify-center text-base sm:text-2xl mb-4">
					<Title text1={"ADOPT"} text2={"PET"} />
				</div>

				{/* map the products */}

				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
					{products.map((item, index) => (
						<ProductItem
							key={index}
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
