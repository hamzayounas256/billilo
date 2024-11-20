import { useContext } from "react";
import { assets } from "../assets/assets";
import { AnimalContext } from "../context/AnimalContext";

export default function Footer() {
	const date = new Date();
	const currentYear = date.getFullYear();

	const { navigate } = useContext(AnimalContext);

	return (
		<div className="w-[100%] bg-black text-white px-2 mt-5">
			<div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 py-20 px-5 text-sm">
				<div>
					<p className="text-xl font-medium mb-5 text-orange-400">ABOUT US</p>
					<p className="w-full md:w-2/3">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
						illum quas similique eos saepe quo? Ipsam amet corrupti rerum
						sapiente, reiciendis error numquam itaque aperiam, consectetur dicta
						dolorem, distinctio sequi.
					</p>
				</div>

				<div>
					<p className="text-xl font-medium mb-5 text-orange-400">PETS</p>
					<ul className="flex flex-col gap-1">
						<li
							className="cursor-pointer"
							onClick={() => navigate("/lostandfoundpet")}
						>
							Lost & Found Pet
						</li>
						<li
							className="cursor-pointer"
							onClick={() => navigate("/adoptpet")}
						>
							Adopt Pet
						</li>
						<li
							className="cursor-pointer"
							onClick={() => navigate("/animalshelter")}
						>
							Animal Shelter
						</li>
						<li
							className="cursor-pointer"
							onClick={() => navigate("/vetsnearby")}
						>
							Vets Nearby
						</li>
					</ul>
				</div>

				<div>
					<p className="text-xl font-medium mb-5 text-orange-400">
						QUICK LINKS
					</p>
					<ul className="flex flex-col gap-1">
						<li className="cursor-pointer" onClick={() => navigate("/")}>
							Home
						</li>
						<li className="cursor-pointer" onClick={() => navigate("/about")}>
							About us
						</li>
						<li className="cursor-pointer">Blogs</li>
						<li className="cursor-pointer" onClick={() => navigate("/contact")}>
							Contact Us
						</li>
					</ul>
				</div>

				<div>
					<p className="text-xl font-medium mb-5 text-orange-400">
						GET IN TOUCH
					</p>
					<ul className="flex flex-col gap-1 ">
						<li className="flex gap-2">
							<img className="w-5" src={assets.call_icon} alt="" />
							+92 355 7251123
						</li>
						<li className="flex gap-2">
							<img className="w-5" src={assets.mail_icon} alt="" />
							info@billilo.com
						</li>
						<li className="flex gap-2">
							<img className="w-5" src={assets.location_icon} alt="" />
							Address 123456789
						</li>
					</ul>
				</div>
			</div>
			<div>
				<hr />
				<p className="py-10 text-center text-sm text-orange-400">
					&copy; {currentYear} BILLILO. All rights reserved.
				</p>
			</div>
		</div>
	);
}
