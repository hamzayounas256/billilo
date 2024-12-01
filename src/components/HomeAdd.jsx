import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function HomeAdd() {
	return (
		<div className="relative px-2">
			{/* Wavy SVG */}
			<motion.svg
				variants={fadeIn("up", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				className="absolute top-0 left-0 w-full h-full hidden lg:block"
			>
				<path
					fill="#FDFBBD"
					fillOpacity="1"
					d="M0,128L40,138.7C80,149,160,171,240,165.3C320,160,400,128,480,122.7C560,117,640,139,720,138.7C800,139,880,117,960,117.3C1040,117,1120,139,1200,133.3C1280,128,1360,96,1400,80L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
				></path>
			</motion.svg>

			{/* Content */}
			<div className="relative flex flex-col items-center justify-center py-16 px-6 lg:flex-row lg:justify-between lg:px-20">
				{/* Text Section */}
				<motion.div
					variants={fadeIn("right", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="text-center lg:text-left max-w-lg"
				>
					<h1
						style={{ fontSize: 20 }}
						className="text-orange-500 text-lg font-bold mb-2"
					>
						Download Our App
					</h1>
					<h1 className="font-semibold text-3xl text-black mb-4">
						Adopt and Sale Your Pets Faster With Billilo
					</h1>
					<p className="text-gray-600 mb-6">
						Adopt and Sale Pet Easily With Billilo Available on iOS & Android
					</p>
					<div className="flex justify-center lg:justify-start gap-4">
						<img
							src={assets.playstore_icon}
							alt="Google Play Store"
							className="h-14 hover:scale-105 transition-transform"
						/>
						<img
							src={assets.appstore_icon}
							alt="App Store"
							className="h-14 hover:scale-105 transition-transform"
						/>
					</div>
				</motion.div>

				{/* Image Section */}
				<motion.div
					variants={fadeIn("left", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="mt-10 lg:mt-0 lg:flex-shrink-0"
				>
					<img
						src={assets.hero_img}
						alt="Mobile app preview"
						className="max-w-xs mx-auto lg:max-w-md"
					/>
				</motion.div>
			</div>
		</div>
	);
}
