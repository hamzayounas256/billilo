import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";
import { assets } from "../assets/assets";
import Title from "./Title";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function CatProduct() {
	const { navigate } = useContext(AnimalContext);
	const uid = localStorage.getItem("id");

	const products = [
		{
			id: 1,
			breed: "Siamese",
			category: "Cat",
			image: assets.siamese1,
		},
		{
			id: 2,
			breed: "British Short Hair",
			category: "Cat",
			image: assets.britishshorthair2,
		},
		{
			id: 3,
			breed: "Maine coon",
			category: "Cat",
			image: assets.mainecoon3,
		},
		{
			id: 4,
			breed: "Percian Cat",
			category: "Cat",
			image: assets.perciancat4,
		},
		{
			id: 5,
			breed: "Rag doll",
			category: "Cat",
			image: assets.ragdoll,
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
				<Title text1={""} text2={"Cats"} />
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Left Side*/}
				<motion.div
					variants={fadeIn("right", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="flex justify-center items-center"
				>
					<img
						className="rounded-lg shadow-lg w-full max-w-md"
						src={assets.cat_pic}
						alt="Cats"
					/>
				</motion.div>

				{/* Right Side */}
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
							/>
							<p className="text-gray-500 text-sm">{item.breed}</p>
							{/* <h3 className="font-bold text-lg">{item.name}</h3> */}
							{/* <p className="font-semibold text-orange-600">Rs {item.price}</p> */}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
