import { useContext } from "react";
import { assets } from "../assets/assets";
import { AnimalContext } from "../context/AnimalContext";

export default function Footer() {
	const date = new Date();
	const currentYear = date.getFullYear();

	const { navigate } = useContext(AnimalContext);

	return (
		<footer className="w-full bg-black text-white mt-10">
			<div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
					<div className="mb-6 lg:mb-0">
						<h3 className="text-xl font-semibold mb-6 text-orange-400 border-b border-orange-400 pb-2 inline-block">
							ABOUT US
						</h3>
						<p className="text-gray-300 leading-relaxed">
							Trusted Pet Adoption Services Adopt a loving pet and give them a
							forever home! Explore a wide variety of pets available for
							adoption. Safe, trusted, and easy-to-use platform to help you find
							your perfect furry friend today.
						</p>
						<div className="mt-6 flex space-x-4">
							<div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-black"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
								</svg>
							</div>
							<div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-black"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
								</svg>
							</div>
							<div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-black"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-6 text-orange-400 border-b border-orange-400 pb-2 inline-block">
							PETS
						</h3>
						<ul className="space-y-3">
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/findlostpet")}
								>
									<span className="mr-2">›</span> Lost Pet
								</button>
							</li>
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/findfoundpet")}
								>
									<span className="mr-2">›</span> Found Pet
								</button>
							</li>
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/findadoptpet")}
								>
									<span className="mr-2">›</span> Adopt Pet
								</button>
							</li>
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/findsellpet")}
								>
									<span className="mr-2">›</span> Sell Pet
								</button>
							</li>
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/findanimalshelter")}
								>
									<span className="mr-2">›</span> Animal Shelter
								</button>
							</li>
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/findvetsnearby")}
								>
									<span className="mr-2">›</span> Vets Nearby
								</button>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-6 text-orange-400 border-b border-orange-400 pb-2 inline-block">
							QUICK LINKS
						</h3>
						<ul className="space-y-3">
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/")}
								>
									<span className="mr-2">›</span> Home
								</button>
							</li>
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/about")}
								>
									<span className="mr-2">›</span> About us
								</button>
							</li>
							{/* <li className="transition-transform hover:translate-x-1">
								<button className="flex items-center text-gray-300 hover:text-orange-400 transition-colors">
									<span className="mr-2">›</span> Blogs
								</button>
							</li> */}
							<li className="transition-transform hover:translate-x-1">
								<button
									className="flex items-center text-gray-300 hover:text-orange-400 transition-colors"
									onClick={() => navigate("/contact")}
								>
									<span className="mr-2">›</span> Contact Us
								</button>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-xl font-semibold mb-6 text-orange-400 border-b border-orange-400 pb-2 inline-block">
							GET IN TOUCH
						</h3>
						<ul className="space-y-4">
							<li className="flex items-center">
								<div className="w-8 h-8 rounded-full bg-orange-400 mr-3 flex items-center justify-center">
									<img className="w-4" src={assets.call_icon} alt="Phone" />
								</div>
								<span className="text-gray-300 hover:text-white transition-colors">
									+92 355 7251123
								</span>
							</li>
							<li className="flex items-center">
								<div className="w-8 h-8 rounded-full bg-orange-400 mr-3 flex items-center justify-center">
									<img className="w-4" src={assets.mail_icon} alt="Email" />
								</div>
								<span className="text-gray-300 hover:text-white transition-colors">
									info@billilo.com
								</span>
							</li>
							<li className="flex items-center">
								<div className="w-8 h-8 rounded-full bg-orange-400 mr-3 flex items-center justify-center">
									<img
										className="w-4"
										src={assets.location_icon}
										alt="Location"
									/>
								</div>
								<span className="text-gray-300 hover:text-white transition-colors">
									Address 123456789
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="border-t border-gray-800">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="py-6 flex flex-col md:flex-row md:justify-between items-center">
						<p className="text-sm text-orange-400">
							&copy; {currentYear}{" "}
							<span className="font-semibold">BILLILO</span>. All rights
							reserved.
						</p>
						<div className="mt-4 md:mt-0">
							<ul className="flex space-x-6 text-xs text-gray-400">
								<li className="hover:text-orange-400 cursor-pointer transition-colors">
									Privacy Policy
								</li>
								<li className="hover:text-orange-400 cursor-pointer transition-colors">
									Terms of Service
								</li>
								<li className="hover:text-orange-400 cursor-pointer transition-colors">
									Cookie Policy
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
