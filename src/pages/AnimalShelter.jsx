import { assets } from "../assets/assets";

export default function AnimalShelter() {
	return (
		<div className="flex flex-col sm:flex-row border border-grey-400">
			{/* Hero Left Side */}
			<div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
				<div className="text-[#414141]">
					<div className="flex items-center gap-2">
						<p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
						<p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
					</div>
					<h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
						LATEST ARRIVALS
					</h1>
					<div className="flex items-center gap-2">
						<p className="font-semibold text-sm md:text-base">SHOP NOW</p>
						<p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
					</div>
				</div>
			</div>
			{/* Hero Right Side */}
			{/* <iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15701.67864656181!2d74.29385650580186!3d31.437745660061903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901b8f9ccc35b%3A0xf37e70286d7726ac!2sEvercare%20Hospital!5e0!3m2!1sen!2s!4v1731910305170!5m2!1sen!2s"
				width="600"
				height="450"
				style="border:0;"
				allowfullscreen=""
				loading="lazy"
				// referrerpolicy="no-referrer-when-downgrade"
			></iframe> */}
			<img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
		</div>
	);
}
