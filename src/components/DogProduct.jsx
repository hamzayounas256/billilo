import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";
import { assets } from "../assets/assets";
import Title from "./Title";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function DogProduct() {
	const { navigate } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");

	const products = [
		{
			id: 1,
			breed: "Siberian Husky",
			category: "Dog",
			image: assets.siberianHusky,
		},
		{
			id: 2,
			breed: "French Bull Dog",
			category: "Dog",
			image: assets.frenchBullDog,
		},
		{
			id: 3,
			breed: "Germen Shephered",
			category: "Dog",
			image: assets.germenShephered,
		},
		{
			id: 4,
			breed: "Golden Retriver",
			category: "Dog",
			image: assets.goldenRetriver,
		},
		{
			id: 5,
			breed: "Bull Dog",
			category: "Dog",
			image: assets.bullDog,
		},
	];

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
					{products.map((item) => (
						<div
							key={item.id}
							onClick={() =>
								uid ? navigate("/findsellpet") : navigate("/login")
							}
							className="cursor-pointer border rounded-lg p-4 shadow-md"
						>
							<img
								className="w-full h-40 object-cover rounded-md mb-2"
								src={item.image}
								alt={item.name}
							/>
							<p className="text-gray-500 text-sm">{item.breed}</p>
							{/* <h3 className="font-bold text-lg">{item.name}</h3> */}
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
						alt="Dog"
					/>
				</motion.div>
			</div>
		</div>
	);
}
