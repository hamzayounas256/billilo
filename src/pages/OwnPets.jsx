import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";
import ProductOwn from "../components/ProductOwn";
import { AnimalContext } from "../context/AnimalContext";

export default function OwnPets() {
	const { apiLink } = useContext(AnimalContext);
	const [products, setProducts] = useState([]);
	const [productsLossFind, setProductsLossFind] = useState([]);

	const uid = localStorage.getItem("id");

	// Fetch dashboard data
	const fetchDashboardData = async () => {
		try {
			const response = await axios.get(apiLink + "/get-pet/", {
				params: {
					user_id: uid,
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

	const fetchFindLost = async () => {
		try {
			const response = await axios.get(apiLink + "/get_find_or_lost/", {
				params: {
					user_id: uid,
				},
			});

			if (response.data.success) {
				setProductsLossFind(response.data.data);
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

	useEffect(() => {
		fetchFindLost(); // Trigger fetch on filter changes
	}, []);

	return (
		<div className="container mx-auto flex flex-col justify-center sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
			{/* Products Section */}
			<div className="md:mx-2">
				<div className="flex justify-center text-base sm:text-2xl mb-4">
					<Title text1={"OWN SALE &"} text2={"ADOPT PETS"} />
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-6">
					{products.map((item) => (
						<ProductOwn
							key={item.id}
							id={item.id}
							status={item.status}
							image={item.images}
							name={item.name}
							category={item.category}
							breed={item.breed}
							location={item.location}
						/>
					))}
				</div>
				<div className="flex justify-center text-base sm:text-2xl my-5 border-t">
					<Title text1={"OWN FIND &"} text2={"LOST PETS"} />
				</div>
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 gap-y-6">
					{productsLossFind.map((item) => (
						<ProductOwn
							key={item.id}
							id={item.id}
							status={item.status}
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
