export default function Notifications() {
	return (
		<>
			<form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto my-14 gap-4 text-orange-500">
				<div className="inline-flex items-center gap-2 mb-2 mt-10">
					<p className="prata-regular text-3xl">Push Notification</p>
					<hr className="border-none h-[1.5px] w-8 bg-orange-800" />
				</div>
				<input
					type="text"
					className="w-full px-3 py-2 border border-gray-800"
					placeholder="Title"
				/>
				<textarea
					className="w-full px-3 py-2 border border-gray-800"
					placeholder="Body"
					rows={3}
				/>
				{/* <input
					type="text"
					className="w-full px-3 py-2 border border-gray-800"
					placeholder="Body"
				/> */}
				<button
					className="bg-black text-white font-light px-8 py-2 mt-4"
					type="submit"
				>
					Send
				</button>
			</form>
		</>
	);
}
