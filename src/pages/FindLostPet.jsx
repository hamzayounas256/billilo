import { useContext, useEffect, useState } from "react";
import ProductItemFindLoss from "../components/ProductItemLost";
import Title from "../components/Title";
import axios from "axios";
// import { assets } from "../assets/assets";
import { AnimalContext } from "../context/AnimalContext";

export default function FindLostPet() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const [products, setProducts] = useState([]);
	// const [categories, setCategories] = useState([]);
	// const [selectedCategory, setSelectedCategory] = useState("");
	// const [showFilter, setShowFilter] = useState(false);

	const uid = localStorage.getItem("id");

	// Fetch categories
	// const fetchCategories = async () => {
	// 	try {
	// 		const response = await axios.get(apiLink + "/get-category/");

	// 		if (response.status === 200) {
	// 			setCategories(response.data.data);
	// 		} else {
	// 			console.error(response.data.message || "Failed to fetch categories");
	// 		}
	// 	} catch (err) {
	// 		console.error("API Error:", err.message);
	// 	}
	// };

	// useEffect(() => {
	// 	fetchCategories();
	// }, []);

	// Fetch dashboard data
	const fetchDashboardData = async () => {
		try {
			const response = await axios.get(apiLink + "/find-lost-dashboard/", {
				params: {
					user_id: uid,
					status: "Lost",
					// category: selectedCategory,
				},
			});

			if (response.data.success) {
				// console.log("Fetched Products:", response.data.data);
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
	}, []);

	return (
		<div className="container mx-auto px-2 flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
			{/* + Button */}
			<div className="absolute top-28 right-5 sm:top-28 sm:right-10 -z-1">
				<button
					className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-orange-700 transition"
					onClick={() => navigate("/postlostpet")}
				>
					+
				</button>
			</div>

			{/* Products Section */}
			<div className="flex-1 md:mx-2">
				<div className="flex justify-center text-base sm:text-2xl mb-4">
					<Title text1={"LOST"} text2={"PET"} />
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6">
					{products.map((item) => (
						<ProductItemFindLoss
							key={item.id}
							id={item.id}
							image={item.images}
							name={item.name}
							category={item.category}
							breed={item.breed}
							address={item.address}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
