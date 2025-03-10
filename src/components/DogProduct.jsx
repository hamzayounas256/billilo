import { useContext, useState, useEffect } from "react";
import { AnimalContext } from "../context/AnimalContext";
import axios from "axios";
import { assets } from "../assets/assets";
import Title from "./Title";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function DogProduct() {
	const { apiLink, navigate } = useContext(AnimalContext);
	const [products, setProducts] = useState([]);
	const [related, setRelated] = useState([]);
	const uid = localStorage.getItem("id");

	const fetchDashboardData = async () => {
		try {
			const response = await axios.get(`${apiLink}/dashboard/`, {
				params: {
					user_id: uid,
					category: 11,
				},
			});

			if (response.data.success) {
				setProducts(response.data.data);
			} else {
				console.error("Error Fetching Products:", response.data.message);
			}
		} catch (err) {
			console.error("API Error while fetching products:", err.message);
		}
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);

	useEffect(() => {
		const relatedProducts = products.slice(0, 5); // Limit to 6 products
		setRelated(relatedProducts);
	}, [products]);

	return (
		<div className="container mx-auto py-2 px-4">
			<motion.div
				variants={fadeIn("down", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="text-3xl text-center py-8"
			>
				<Title text1={""} text2={"Dogs"} />
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Left Side*/}

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{related.map((item) => (
						<div
							key={item.id}
							onClick={() => navigate(`/productsell/${item.id}`)}
							className="cursor-pointer border rounded-lg p-4 shadow-md"
						>
							<img
								className="w-full h-40 object-cover rounded-md mb-2"
								src={item.images[0]}
								alt={item.name}
							/>
							<p className="text-gray-500 text-sm">{item.category}</p>
							<h3 className="font-bold text-lg">{item.name}</h3>
							{/* <p className="font-semibold text-orange-600">Rs {item.price}</p> */}
						</div>
					))}
				</div>

				{/* Right Side */}
				<motion.div
					variants={fadeIn("left", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="flex justify-center items-center"
				>
					<img
						className="rounded-lg shadow-lg w-full max-w-md"
						src={assets.about_img}
						alt="Cats"
					/>
				</motion.div>
			</div>
		</div>
	);
}
