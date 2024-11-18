import { useContext } from "react";
import { AnimalContext } from "../context/AnimalContext";

export default function Login() {
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
				<p className="prata-regular text-3xl">Login</p>
				<hr className="border-none h-[1.5px] w-8 bg-gray-800" />
			</div>

			<input
				type="email"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Email Address"
				required
			/>
			<input
				type="password"
				className="w-full px-3 py-2 border border-gray-800"
				placeholder="Password"
				required
			/>
			<div className="w-full flex justify-between text-sm mt-[-8px]">
				<p className="cursor-pointer">Forgot Your Password?</p>

				<p className="cursor-pointer" onClick={() => navigate("/signup")}>
					Create Account
				</p>
			</div>
			<button className="bg-black text-white font-light px-8 py-2 mt-4">
				Login
			</button>
		</form>
	);
}