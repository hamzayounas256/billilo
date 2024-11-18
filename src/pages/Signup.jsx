import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";

export default function Signup() {
	const { navigate } = useContext(AnimalContext);
	const onSubmitHandler = async (e) => {
		e.preventDefault();
	};
	return (
		<form
			onSubmit={onSubmitHandler}
			className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-gray-800"
		>
			<div className="inline-flex items-center gap-2 mb-2 mt-10">
				<p className="prata-regular text-3xl">Sign Up</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			<div className="w-full flex justify-between gap-2">
				<input
					type="text"
					className="w-1/2 px-3 py-2 border border-gray-800"
					placeholder="First Name"
					required
				/>
				<input
					type="text"
					className="w-1/2 px-3 py-2 border border-gray-800"
					placeholder="Last Name"
					required
				/>
			</div>

			<input
				type="email"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Email Address"
				required
			/>
			<div className="w-full flex justify-between gap-2">
				<input
					type="text"
					className="w-1/2 px-3 py-2 border border-gray-800"
					placeholder="Phone Number"
					required
				/>
				<input
					type="text"
					className="w-1/2 px-3 py-2 border border-gray-800"
					placeholder="Country Name"
					required
				/>
			</div>

			<input
				type="password"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Password"
				required
			/>

			<input
				type="password"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Confirm Password"
				required
			/>

			<div className="w-full flex justify-between text-sm mt-[-8px]">
				<p className="cursor-pointer">Forgot Your Password?</p>

				<p className="cursor-pointer" onClick={() => navigate("/login")}>
					Login Here
				</p>
			</div>
			<button className="bg-black text-white font-light px-8 py-2 mt-4">
				Sign Up
			</button>
		</form>
	);
}
