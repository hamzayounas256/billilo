import Title from "../components/Title";

import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function AnimalShelter() {
	return (
		<div className="container mx-auto">
			<motion.div
				variants={fadeIn("down", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="text-center text-2xl pt-10 border-t"
			>
				<Title text1={"ANIMAL"} text2={"SHELTER"} />
			</motion.div>
			<div className="flex flex-col sm:flex-row border my-5 border-grey-400">
				{/* Hero Left Side */}
				<motion.div
					variants={fadeIn("right", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"
				>
					<div className="lg:ms-10 text-[#414141]">
						<h1 className="prata-regular text-xl sm:py-3 lg:text-2xl leading-relaxed text-orange-500">
							STRAY HOME REHABLITATION CENTER
						</h1>
						<div className="flex items-center gap-2 my-5">
							<p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
							<p className="font-medium text-sm md:text-base">
								<b>Address: </b>Sangrial, D-13, Islamabad
							</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="font-semibold text-sm md:text-base">0311 5395616</p>
							<p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
						</div>
					</div>
				</motion.div>
				{/* Hero Right Side */}
				<motion.iframe
					variants={fadeIn("left", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.152623064833!2d72.92568937479781!3d33.70499943598754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbd9b4b4feb69%3A0xf21171d4aecb56b8!2sStrays%20Home%20Rehabilitation%20Shelter!5e0!3m2!1sen!2s!4v1731919917399!5m2!1sen!2s"
					className="w-full sm:w-1/2 h-[45vh]"
				></motion.iframe>
			</div>
			<div className="flex flex-col sm:flex-row border my-5 border-grey-400">
				{/* Hero Left Side */}
				<motion.div
					variants={fadeIn("right", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"
				>
					<div className="lg:ms-10 text-[#414141]">
						<h1 className="prata-regular text-xl sm:py-3 lg:text-2xl leading-relaxed text-orange-500">
							ALL CREATURES ANIMAL HOSPITAL & SHELTER
						</h1>
						<div className="flex items-center gap-2 my-5">
							<p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
							<p className="font-medium text-sm md:text-base">
								<b>Address: </b>All creatures animal hospital and shelter,
								Islamabad, Islamabad Capital Territory 46000
							</p>
						</div>

						<div className="flex items-center gap-2">
							<p className="font-semibold text-sm md:text-base">0311 0406666</p>
							<p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
						</div>
					</div>
				</motion.div>
				{/* Hero Right Side */}
				<motion.iframe
					variants={fadeIn("left", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.152623064833!2d72.92568937479781!3d33.70499943598754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbd9b4b4feb69%3A0xf21171d4aecb56b8!2sStrays%20Home%20Rehabilitation%20Shelter!5e0!3m2!1sen!2s!4v1731919917399!5m2!1sen!2s"
					className="w-full sm:w-1/2 h-[45vh]"
				></motion.iframe>
			</div>
		</div>
	);
}
