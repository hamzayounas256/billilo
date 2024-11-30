import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimalContext } from "../context/AnimalContext";
// import { assets } from "../assets/assets";

export default function ProductAdopt() {
	const { productId } = useParams(); // productId from URL params
	const { currency, navigate, apiLink } = useContext(AnimalContext);
	const [products, setProducts] = useState([]);
	const [image, setImage] = useState([]);
	const [productData, setProductData] = useState(null); // Save matched product here
	const uid = localStorage.getItem("id");

	// Fetch Dashboard Data
	const fetchDashboardData = async () => {
		try {
			const response = await axios.get(apiLink + "/dashboard/", {
				params: {
					user_id: uid,
					status: "Adopt",
				},
			});

			if (response.data.success) {
				setProducts(response.data.data); // Save API data in state
			} else {
				console.error(response.data.message || "Failed to fetch data");
			}
		} catch (err) {
			console.error("API Error:", err.message);
		}
	};

	// Find the Product Based on productId
	const fetchProductData = () => {
		if (products.length > 0) {
			products.map((item) => {
				if (Number(item.id) === Number(productId)) {
					// console.log(item);
					setProductData(item);
					setImage(item.images[0]);
					return null;
				}
			});
		}
	};

	// Fetch Dashboard Data Once on Component Mount
	useEffect(() => {
		fetchDashboardData();
	}, []);

	// Fetch Product Data When `products` or `productId` Change
	useEffect(() => {
		fetchProductData();
	}, [products, productId]);

	return productData ? (
		<div className="border-t-2 pt-10 px-2 transition-opacity ease-in duration-500 opacity-500">
			{/* product Data  */}
			<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
				{/* product images  */}
				<div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
					<div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
						{productData.images.map((item, index) => (
							<img
								key={index}
								src={item}
								onClick={() => setImage(item)}
								className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
							/>
						))}
					</div>
					<div className="w-full sm:w-[80%]">
						<img src={image} className="w-full h-auto" />
					</div>
				</div>
				{/* product Info  */}
				<div className="flex-1">
					<h1 className="font-medium text-3xl mt-2">{productData.name}</h1>

					<p className="mt-5 text-md font-medium">
						Category: {productData.category}
					</p>
					<p className="mt-5 text-md font-medium">Breed: {productData.breed}</p>
					<p className="mt-5 text-md font-medium">Sex: {productData.sex}</p>
					<p className="mt-5 text-md font-medium">
						Age: {productData.age} Years
					</p>
					<p className="mt-5 text-md font-medium">
						Address: {productData.address}
					</p>
					{/* <p className="mt-5 text-3xl font-medium">
						{currency}
						{": "}
						{productData.price.toLocaleString()}
					</p> */}
					{/* <p className="my-5 text-gray-500 md:w-4/5">
						Description: {productData.description}
					</p> */}

					<button
						onClick={() => navigate("/hero")}
						className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
					>
						MORE INFO...
					</button>
					<div className="flex flex-row align-middle mt-5 text-md border px-3 py-3">
						<p>
							<b>Owner:</b>
							<br /> Name:
							{productData.user.first_name + productData.user.last_name}
							<br /> Email: {productData.user.email}
							<br /> Phone: {productData.user.phone_no}
							<br /> Location: {productData.location}
							<br /> Country: {productData.user.country}
							<br /> Created At: {productData.created_at}
						</p>
						<img src={productData.user.image[0]} alt="" />
					</div>
					<hr className="mt-8 sm:w-4/5" />
				</div>
			</div>
			{/* review Section  */}
			<div className="mt-20">
				<div className="flex">
					<p className="border px-5 py-3 text-sm">Description</p>
				</div>
				<div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
					<p>{productData.description}</p>
				</div>
			</div>
		</div>
	) : (
		<div>No record Found</div>
	);
}
