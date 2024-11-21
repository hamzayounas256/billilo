import Title from "../components/Title";
import { assets } from "../assets/assets";

import { motion } from "framer-motion";
import { fadeIn } from "../variants";

export default function Contact() {
	return (
		<div className="container mx-auto">
			<motion.div
				variants={fadeIn("down", 0.2)}
				initial="hidden"
				whileInView={"show"}
				viewport={{ once: true, amount: 0.9 }}
				className="text-center text-2xl pt-10 border-t"
			>
				<Title text1={"CONTACT"} text2={"US"} />
			</motion.div>
			<div className="flex flex-col md:flex-row justify-center gap-10 mb-28">
				<motion.img
					variants={fadeIn("right", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="w-full md:max-w-[480px]"
					src={assets.contact_img}
					alt=""
				/>
				<motion.div
					variants={fadeIn("left", 0.2)}
					initial="hidden"
					whileInView={"show"}
					viewport={{ once: true, amount: 0.9 }}
					className="flex flex-col justify-center items-start gap-6"
				>
					<p className="font-semibold text-xl text-orange-600">OUR STORE</p>
					<p className="text-gray-500">
						15-D Al-Makkah Colony <br /> Township, Lahore, Pakistan
					</p>
					<p className="text-gray-500">
						Tel: +923 364 527 513 <br /> Email: hamzayounas256@gmail.com
					</p>
					<p className="font-semibold text-xl text-orange-600">
						Careers at Billingo
					</p>
					<p className="text-gray-500">
						Learn more about our teams and job openings.
					</p>
					<button className="border border-orange-600 text-orange-600 px-8 py-4 text-sm hover:bg-orange-600 hover:text-white transition-all duration-500">
						Explore Jobs
					</button>
				</motion.div>
			</div>
		</div>
	);
}
