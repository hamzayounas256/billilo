import { Link } from "react-router-dom";
export default function ProductItemFind({
	id,
	name,
	image,
	category,
	breed,
	location,
	address,
}) {
	return (
		<Link className="text-gray-700 cursor-pointer" to={`/productfind/${id}`}>
			{/* <div className="text-gray-700 cursor-pointer"> */}
			<div className="overflow-hidden h-64 w-full flex items-center justify-center bg-gray-200">
				<img
					className="hover:scale-110 transition ease-in-out object-cover h-full w-full"
					src={image[0]}
					alt=""
				/>
			</div>
			<p className="pt-3 pb-1 text-sm text-orange-500">{name}</p>
			{/* <p className="text-sm font-medium">{breed}</p> */}
			<p className="text-sm font-medium">{address}</p>
			{/* </div> */}
		</Link>
	);
}
