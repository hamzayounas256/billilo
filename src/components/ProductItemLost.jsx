import { Link } from "react-router-dom";
export default function ProductItemLost({
	id,
	name,
	image,
	category,
	breed,
	location,
}) {
	return (
		<Link className="text-gray-700 cursor-pointer" to={`/productlost/${id}`}>
			{/* <div className="text-gray-700 cursor-pointer"> */}
			<div className="overflow-hidden h-64 w-full flex items-center justify-center bg-gray-200">
				<img
					className="hover:scale-110 transition ease-in-out object-cover h-full w-full"
					src={image[0]}
					alt=""
				/>
			</div>
			<p className="pt-3 pb-1 text-sm text-orange-500">{name}</p>
			<p className="text-sm font-medium">{breed}</p>
			<p className="text-sm font-medium">{location}</p>
			{/* </div> */}
		</Link>
	);
}
