import { useContext, useEffect, useState } from "react";
import { AnimalContext } from "../context/AnimalContext";
import Title from "../components/Title";
import axios from "axios";

export default function AllCategory() {
	const { apiLink, navigate } = useContext(AnimalContext);

	const [subcategory, setSubCategory] = useState([]);
	const [category, setCategory] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

	// Fetch Categories
	const getCategory = async () => {
		try {
			const response = await axios.get(apiLink + "/get-category/");
			if (response.status === 200) {
				setCategory(response.data.data);
			} else {
				console.warn(response.data.message || "Failed to fetch categories");
			}
		} catch (err) {
			console.error("API Error:", err.message);
		}
	};

	// Fetch Subcategories based on selected category
	const getSubCategory = async (categoryId) => {
		if (!categoryId) return; // Prevent API call if no category is selected
		try {
			const response = await axios.get(apiLink + "/get-sub-category/", {
				params: { categ_id: categoryId },
			});
			if (response.status === 200) {
				setSubCategory(response.data.data);
			} else {
				console.warn(response.data.message || "Failed to fetch subcategories");
			}
		} catch (err) {
			console.error("API Error:", err.message);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	// Fetch subcategories when selected category changes
	useEffect(() => {
		getSubCategory(selectedCategory);
	}, [selectedCategory]);

	return (
		<div className="flex justify-center items-center py-2">
			{/* + Button */}
			<div className="absolute top-28 right-5 sm:top-28 sm:right-10 -z-1">
				<button
					className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-orange-700 transition"
					onClick={() => navigate("/postsubcategory")}
				>
					+
				</button>
			</div>
			<div className="w-full max-w-5xl p-6">
				<div className="flex justify-center text-base sm:text-2xl mb-2">
					<Title text1={"SUB"} text2={"CATEGORIES"} />
				</div>

				<select
					id="categ_id"
					className="border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 my-4"
					onChange={(e) => setSelectedCategory(e.target.value)}
					value={selectedCategory}
				>
					<option value="">Choose a Category</option>
					{category.map((item) => (
						<option key={item.id} value={item.id}>
							{item.name}
						</option>
					))}
				</select>

				{subcategory.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
						{subcategory.map((item, index) => (
							<div
								key={index}
								className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 flex flex-col items-center"
							>
								<img
									src={item.image}
									alt={item.name}
									className="w-32 h-32 object-cover mb-3"
								/>
								<h3 className="text-lg font-semibold text-gray-700">
									{item.name}
								</h3>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-gray-500">No records found</p>
				)}
			</div>
		</div>
	);
}
