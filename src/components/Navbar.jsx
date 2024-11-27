import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AnimalContext } from "../context/AnimalContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function Navbar() {
	const [visible, setVisible] = useState(false);

	const [currentStatus, setCurrentStatus] = useState("Login");

	const { navigate } = useContext(AnimalContext);

	const accessToken = localStorage.getItem("access_token");
	const id = localStorage.getItem("id");
	const userImg = localStorage.getItem("userImg");
	const name = localStorage.getItem("user_name");

	useEffect(() => {
		// Check if the user is logged in on component mount
		if (accessToken !== null) {
			setCurrentStatus("Logout");
		}
	}, [accessToken]);

	const logoutHandler = async () => {
		try {
			const response = await axios.post(
				"https://petapp1503.pythonanywhere.com/petapp/logout/",
				{
					user_id: id,
					access_token: accessToken,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);

			if (response.status === 200) {
				// console.log("Logout successful");

				// Remove user data from localStorage
				localStorage.removeItem("user");
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user_name");
				localStorage.removeItem("id");
				localStorage.removeItem("user_email");
				localStorage.removeItem("userImg");

				// Update status and navigate to Login page
				setCurrentStatus("Login");
				toast.success("Logout Successfully");
				navigate("/");
			} else {
				toast.error("Logout failed:", response.data);
			}
		} catch (error) {
			if (error.response) {
				console.error("Response Error:", error.response.data);
				console.error("Status Code:", error.response.status);
				console.error("Headers:", error.response.headers);
			} else if (error.request) {
				console.error("Request Error:", error.request);
			} else {
				console.error("Other Error:", error.message);
			}
		}
	};
	return (
		<div className="container mx-auto flex items-center justify-between py-5 font-medium">
			<Link to="/">
				<img src={assets.logo} className="w-36" alt="Logo" />
			</Link>

			<ul className="hidden sm:flex gap-5 text-sm text-orange-700">
				<NavLink to="/" className="flex flex-col gap-1 items-center">
					<p>HOME</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
				</NavLink>
				<NavLink to="/about" className="flex flex-col gap-1 items-center">
					<p>ABOUT US</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
				</NavLink>
				{currentStatus === "Login" ? (
					""
				) : (
					<div className="flex flex-col gap-1 items-center">
						<div className="group relative">
							<p>FIND PET</p>
							<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
							<div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3">
								<div className="flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-grey-500 rounded">
									<p
										onClick={() => navigate("/findlostpet")}
										className="cursor-pointer hover:text-black"
									>
										LOST PET
									</p>
									<p
										onClick={() => navigate("/findfoundpet")}
										className="cursor-pointer hover:text-black"
									>
										FOUND PET
									</p>
									<p
										onClick={() => navigate("/findadoptpet")}
										className="cursor-pointer hover:text-black"
									>
										ADOPT PET
									</p>
									<p
										onClick={() => navigate("/findsellpet")}
										className="cursor-pointer hover:text-black"
									>
										SELL PET
									</p>
								</div>
							</div>
						</div>
						<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
					</div>
				)}
				{currentStatus === "Login" ? (
					""
				) : (
					<div className="flex flex-col gap-1 items-center">
						<div className="group relative">
							<p>POST PET</p>
							<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
							<div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3">
								<div className="flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-grey-500 rounded">
									<p
										onClick={() => navigate("/postlostpet")}
										className="cursor-pointer hover:text-black"
									>
										LOST PET
									</p>
									<p
										onClick={() => navigate("/postfoundpet")}
										className="cursor-pointer hover:text-black"
									>
										FOUND PET
									</p>

									<p
										onClick={() => navigate("/postadoptpet")}
										className="cursor-pointer hover:text-black"
									>
										ADOPT PET
									</p>
									<p
										onClick={() => navigate("/postsellpet")}
										className="cursor-pointer hover:text-black"
									>
										SELL PET
									</p>
								</div>
							</div>
						</div>
						<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
					</div>
				)}
				<div className="flex flex-col gap-1 items-center">
					<div className="group relative">
						<p>PET CARE</p>
						<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
						<div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3">
							<div className="flex flex-col gap-2 w-48 py-3 px-5 bg-slate-100 text-grey-500 rounded">
								<p
									onClick={() => navigate("/findanimalshelter")}
									className="cursor-pointer hover:text-black"
								>
									FIND ANIMAL SHELTER
								</p>

								<p
									onClick={() => navigate("/findvetsnearby")}
									className="cursor-pointer hover:text-black"
								>
									FIND VETS NEARBY
								</p>
								{currentStatus === "Login" ? (
									""
								) : (
									<>
										<p
											onClick={() => navigate("/postanimalshelter")}
											className="cursor-pointer hover:text-black"
										>
											POST ANIMAL SHELTER
										</p>
										<p
											onClick={() => navigate("/postvetsnearby")}
											className="cursor-pointer hover:text-black"
										>
											POST VETS NEARBY
										</p>
									</>
								)}
							</div>
						</div>
					</div>
					<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
				</div>
				<NavLink to="/contact" className="flex flex-col gap-1 items-center">
					<p>CONTACT</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
				</NavLink>
			</ul>

			{/* <div
				onClick={() => navigate("/Login")}
				className="flex items-center gap-2 text-sm text-orange-700 cursor-pointer"
			>
				{userImg ? (
					<img className="w-5" src={userImg} alt="profile" />
				) : (
					<img className="w-5" src={assets.profile_icon} alt="profile" />
				)}
				{currentStatus === "Login" ? (
					<p onClick={() => navigate("/Login")}>Login</p>
				) : (
					<p onClick={logoutHandler}>LOGOUT</p>
				)}

				<img
					src={assets.menu_icon}
					onClick={() => setVisible(true)}
					className="w-5 cursor-pointer sm:hidden"
					alt=""
				/>
			</div> */}
			<div className="flex items-center gap-2 text-sm text-orange-700 cursor-pointer">
				<div className="group relative">
					{userImg ? (
						<img className="w-10 rounded-full" src={userImg} alt="profile" />
					) : (
						<img
							className="w-6 rounded-full"
							src={assets.profile_icon}
							alt="profile"
						/>
					)}
					<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
					<div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3">
						<div className="flex flex-col gap-2 w-44 py-3 px-5 bg-slate-100 text-grey-500 rounded">
							{currentStatus === "Login" ? (
								""
							) : (
								<>
									<p
										className="cursor-pointer hover:text-black"
										onClick={() => navigate("/profile")}
									>
										{name.toUpperCase()}
									</p>
									<p
										onClick={() => navigate("/ownpets")}
										className="cursor-pointer hover:text-black"
									>
										OWN PETS
									</p>
								</>
							)}

							{currentStatus === "Login" ? (
								<p
									className="hover:text-black"
									onClick={() => navigate("/Login")}
								>
									Login
								</p>
							) : (
								<p className="hover:text-black" onClick={logoutHandler}>
									LOGOUT
								</p>
							)}
						</div>
					</div>
				</div>
				<img
					src={assets.menu_icon}
					onClick={() => setVisible(true)}
					className="w-5 cursor-pointer sm:hidden"
					alt=""
				/>
				<hr className="w-2/4 border-none h-[1.5px] bg-orange-700 hidden" />
			</div>
			{/* Sidebar menu for small screens */}
			<div
				className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
					visible ? "w-full" : "w-0"
				}`}
			>
				<div className="flex flex-col text-gray-600">
					<div
						onClick={() => {
							setVisible(false);
						}}
						className="flex items-center gap-4 p-3 cursor-pointer"
					>
						<img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
						<p>Back</p>
					</div>
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/"
					>
						HOME
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/about"
					>
						ABOUT US
					</NavLink>
					{currentStatus === "Login" ? (
						""
					) : (
						<>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/findlostpet"
							>
								FIND PET {">"} LOST PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/findfoundpet"
							>
								FIND PET {">"} FOUND PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/findadoptpet"
							>
								FIND PET {">"} ADOPT PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/findsellpet"
							>
								FIND PET {">"} SELL PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/postlostpet"
							>
								POST PET {">"} LOST PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/postfoundpet"
							>
								POST PET {">"} FOUND PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/postadoptpet"
							>
								POST PET {">"} ADOPT PET
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/postsellpet"
							>
								POST PET {">"} SELL PET
							</NavLink>
						</>
					)}
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/findanimalshelter"
					>
						PET CARE {">"} FIND ANIMAL SHELTER
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/findvetsnearby"
					>
						PET CARE {">"} FIND VETS NEARBY
					</NavLink>
					{currentStatus === "Login" ? (
						""
					) : (
						<>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/postanimalshelter"
							>
								PET CARE {">"} POST ANIMAL SHELTER
							</NavLink>
							<NavLink
								onClick={() => setVisible(false)}
								className="py-2 pl-6 border"
								to="/postvetsnearby"
							>
								PET CARE {">"} POST VETS NEARBY
							</NavLink>
						</>
					)}
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/contact"
					>
						CONTACT
					</NavLink>
				</div>
			</div>
		</div>
	);
}
