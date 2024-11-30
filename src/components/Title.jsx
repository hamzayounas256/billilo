export default function Title({ text1, text2 }) {
	return (
		<div
			style={{
				fontSize: "20",
			}}
			className="inline-flex gap-2 items-center mb-3"
		>
			<p className="text-orange-400">
				{text1}
				<span className="text-orange-600 font-medium"> {text2}</span>
			</p>
			<p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-orange-600"></p>
		</div>
	);
}
