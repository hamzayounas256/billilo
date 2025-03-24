import { useContext, useEffect, useState } from "react";
import { AnimalContext } from "../context/AnimalContext";
import Title from "../components/Title";
import axios from "axios";

export default function AllCategory() {
	const { apiLink, navigate } = useContext(AnimalContext);

	const [category, setCategory] = useState([]);
	const getCategory = async () => {
		try {
			const response = await axios.get(apiLink + "/get-category/");

			if (response.status === 200) {
				setCategory(response.data.data);
			} else {
				console.error(response.data.message || "Failed to fetch categories");
			}
		} catch (err) {
			console.error("API Error:", err.message);
		}
	};

	useEffect(() => {
		getCategory();
	}, []);

	return (
		<div className="flex justify-center items-center py-2">
			{/* + Button */}
			<div className="absolute top-28 right-5 sm:top-28 sm:right-10 -z-1">
				<button
					className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-orange-700 transition"
					onClick={() => navigate("/postcategory")}
				>
					+
				</button>
			</div>
			<div className="w-full max-w-5xl p-6">
				<div className="flex justify-center text-base sm:text-2xl mb-4">
					<Title text1={"ALL"} text2={"CATEGORIES"} />
				</div>

				{category && category.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
						{category.map((item, index) => (
							<div
								key={index}
								className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 flex flex-col items-center"
							>
								<img
									src={item.image}
									alt={item.name}
									className="w-32 h-32 object-cover rounded-full mb-3 border"
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
