import { assets } from "../assets/assets";
import Title from "./Title";

export default function DogProduct() {
	return (
		<div className="container mx-auto">
			<div className="text-3xl text-center py-8">
				<Title text1={"My"} text2={"Dogs"} />
			</div>
			<div className="flex flex-col sm:flex-row border border-grey-400">
				{/* Hero Right Side */}
				<img className="w-full sm:w-1/2" src={assets.about_img} alt="" />
				{/* Hero Left Side */}
				<div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
					<div className="text-[#414141]">
						<div className="flex items-center gap-2">
							<p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
							<p className="font-medium text-sm md:text-base">
								{/* OUR BESTSELLERS */}
							</p>
						</div>
						<h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
							{/* LATEST ARRIVALS */}
						</h1>
						<div className="flex items-center gap-2">
							<p className="font-semibold text-sm md:text-base">
								{/* SHOP NOW */}
							</p>
							<p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
