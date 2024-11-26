import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function Hero() {
	return (
		<div className="flex flex-col sm:flex-row border-t bg-[#FFBE00]">
			{/* Hero Left Side */}
			<motion.div
				variants={fadeIn("down", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="w-full sm:w-1/2 flex items-center justify-center px-5 py-10 sm:py-0"
			>
				<div className="text-black">
					{/* <div className="flex items-center gap-2">
						<p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
						<p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
					</div> */}
					<h1 className="prata-regular text-3xl sm:py-3 lg:text-4xl lg:pb-10 leading-relaxed">
						Download Our Mobile App
					</h1>
					<div className="flex items-center gap-2">
						<p className="w-8 md:w-11 h-[1px] bg-black"></p>
						<p className="font-semibold text-sm md:text-base">
							Trusted Pet Adoption Services Adopt a loving pet and give them a
							forever home! Explore a wide variety of pets available for
							adoption. Safe, trusted, and easy-to-use platform to help you find
							your perfect furry friend today.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row justify-between gap-4 p-5 lg:pt-16">
						<img
							className="w-48 hover:scale-110 transition ease-in-out"
							src={assets.playstore_icon}
							alt=""
						/>
						<img
							className="w-48 hover:scale-110 transition ease-in-out"
							src={assets.appstore_icon}
							alt=""
						/>
					</div>
				</div>
			</motion.div>
			{/* Hero Right Side */}
			<motion.img
				variants={fadeIn("left", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="max-w-xs mx-auto lg:max-w-lg"
				src={assets.hero_img}
				alt=""
			/>
		</div>
	);
}
